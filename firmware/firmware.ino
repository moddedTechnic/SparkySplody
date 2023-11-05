#define A1 9
#define A2 10
#define A3 3
#define B1 12
#define B2 13
#define B3 5

struct PinState {
  uint8_t last;
  uint8_t reg;
  uint8_t latch;
  uint8_t count;
};

struct PinState a = { 0 };
struct PinState b = { 0 };

void setup() {
  pinMode(A1, INPUT);
  pinMode(A2, INPUT);
  pinMode(A3, OUTPUT);
  pinMode(B1, INPUT);
  pinMode(B2, INPUT);
  pinMode(B3, OUTPUT);
}

void loop() {
  uint8_t aChanged = digitalRead(A1) != a.last;
  if (aChanged)
    a.last = !a.last;
  uint8_t bChanged = digitalRead(B1) != b.last;
  if (bChanged)
    b.last = !b.last;

  if (aChanged && a.last) {
    a.reg = (a.reg << 1) | digitalRead(A2);
    a.count = (a.count + 1) & 0x07;
    if (!a.count)
      a.latch = a.reg;
  }
  if (bChanged && b.last) {
    b.reg = (b.reg << 1) | digitalRead(B2);
    b.count = (b.count + 1) & 0x07;
    if (!b.count)
      b.latch = b.reg;
  }
  analogWrite(A3, a.latch);
  analogWrite(B3, b.latch);
}
