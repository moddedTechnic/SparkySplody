#include "Robot.h"

Joint* grab = 0;
Joint* wristA = 0;
Joint* wristB = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("-----------------------------------");
  grab   = new Joint(3, 90, 180);
  wristA = new Joint(5, 45, 270);
  wristB = new Joint(6, 45, 270);
}

void loop() {
  grab->update();
  Serial.print(",");
  wristA->update();
  Serial.print(",");
  wristB->update();
  Serial.println();
  delay(2 / 180);
}
