import socketserver
from typing import Any, Iterable, NamedTuple, Optional

__all__ = [
    "RequestHandler",
    "Request",
    "main",
    "start_server",
]


class RequestHandler(socketserver.StreamRequestHandler):
    def read(self, count: int) -> bytes:
        """Reads `count` characters from the TCP stream"""
        return self.rfile.read(count)


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


class HandleSpecial(RequestHandler):
    def handle(self) -> None:
        data = self.read(2)
        data = (data[0] << 8) | data[1]
        method = data & 0xC0
        motor = data & 0x3C
        parity = data & 0x20
        value = data & 0x1F
        print(method, motor, parity, value)


if __name__ == "__main__":
    exit(start_server(HandleSpecial, host="100.73.203.93", port=6666))