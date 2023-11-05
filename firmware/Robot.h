#ifndef ROBOT_H
#define ROBOT_H

#include "Arduino.h"

class Joint {
public:
  uint8_t pin;
  int16_t amount;
  bool direction;
  int16_t minimum; int16_t maximum;

public:
  inline Joint(uint16_t pin, int16_t minimum, int16_t maximum)
      : pin(pin), amount(minimum), direction(false), minimum(minimum),
        maximum(maximum) {
    Serial.print("minimum: ");
    Serial.print(minimum);
    Serial.print(", maximum: ");
    Serial.println(maximum);
    pinMode(pin, OUTPUT);
  }

  void update();
};

#endif
