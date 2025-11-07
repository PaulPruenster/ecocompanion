#pragma once

#include <Arduino.h>
#include <Servo.h>

class Tamagochi {
public:
  Tamagochi();
  void update();

private:
  Servo servo
};
