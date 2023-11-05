import socketserver
import time
from typing import Optional

from gpiozero import OutputDevice, Servo

__all__ = [
    "RequestHandler",
    "start_server",
]

servoA = Servo(12)
servoB = Servo(13)
servoC1 = OutputDevice(19)  # clock
servoC2 = OutputDevice(16)  # data
servoD1 = OutputDevice(20)  # clock
servoD2 = OutputDevice(26)  # data
servoE1 = OutputDevice(9)   # clock
servoE2 = OutputDevice(25)  # data
servoF1 = OutputDevice(11)  # clock
servoF2 = OutputDevice(8)   # data


class RequestHandler(socketserver.StreamRequestHandler):
    def read(self, count: int) -> bytes:
        """Reads `count` characters from the TCP stream"""
        return self.rfile.read(count)

    def readline(self) -> bytes:
        return self.rfile.readline()


def start_server(handler, host: Optional[str] = None, port: int = 0):
    host = host or "localhost"
    with socketserver.TCPServer((host, port), handler) as server:
        server.allow_reuse_port = True
        port = server.server_address[1]
        print(f"Starting server on {host}:{port}")
        with open("address", "w") as f:
            f.write(f"{host}:{port}")
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nServer shutting down")
            server.shutdown()


def write_motor(data_pin: OutputDevice, clock_pin: OutputDevice, value: int) -> None:
    flipped = 0
    while value:
        flipped, value = (flipped << 1) | (value & 1), value >> 1
    while flipped:
        if flipped & 1:
            data_pin.on()
        else:
            data_pin.off()
        flipped >>= 1
        clock_pin.on()
        time.sleep(0.025)
        clock_pin.off()
        time.sleep(0.025)


class HandleSpecial(RequestHandler):
    def handle(self) -> None:
        data = self.readline().decode("utf-8")
        _, path, *_ = data.split(" ")
        _, data, *_ = path.split("?")
        _, data, *_ = data.split("=")
        print(data)
        data = int(data, 36)
        method = (data & 0xC000) >> 14
        print(hex(method)[2:].rjust(4, "0"))
        if method == 0b00:
            one = data & 0x0200
            if one == 0:
                print("Bad one bit")
                return
            motor = (data & 0x3C00) >> 10
            value = data & 0x01FF
            if motor == 0:
                servoA.value = value / 180
            elif motor == 1:
                servoB.value = value / 180
            elif motor == 2:
                write_motor(servoC2, servoC1, value)
            elif motor == 3:
                write_motor(servoD2, servoD1, value)
            elif motor == 4:
                write_motor(servoE2, servoE1, value)
            elif motor == 5:
                write_motor(servoF2, servoF1, value)
            return
        print(f"Bad method: {method}")


if __name__ == "__main__":
    exit(start_server(HandleSpecial, host="100.73.203.93", port=8666))
