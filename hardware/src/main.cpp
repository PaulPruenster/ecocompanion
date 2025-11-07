#include <Arduino.h>

void setup() {
  Serial.begin(74880);
  delay(1000); // give the serial port time to open
  Serial.println("Hello from ecocompanion hardware!");
}

void loop() {
  static unsigned long last = 0;
  if (millis() - last >= 1000) {
    last = millis();
    Serial.println("Tick");
  }
}
