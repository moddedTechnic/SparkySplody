#include "Robot.h"

void Joint::update() {
  analogWrite(this->pin, this->amount);
  if (this->amount <= this->minimum) {
    this->direction = true;
  }
  else if (this->amount >= this->maximum) {
    this->direction = false;
  }
  if (this->direction)
    this->amount += 1;
  else
    this->amount -= 1;
}
