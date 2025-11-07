#include "Tamagochi.hpp">

Tamagochi::Tamagochi() {
  myservo.attach(9); // attaches the servo on pin 9 to the Servo object
  Serial.begin(74880);
}

void Tamagochi::update() {}
