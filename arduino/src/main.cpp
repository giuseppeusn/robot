#include <Arduino.h>
#include <SoftwareSerial.h>

#include <headers/leds.h>
#include "headers/motors.h"


SoftwareSerial HC06(10, 11); // RX, TX

void setup() {
  setupLeds();

  Serial.begin(9600);
  HC06.begin(9600);

  HC06.setTimeout(50);
}

void loop() {
  if (HC06.available()) {
    String data = HC06.readString();
    String message = data.substring(1, data.length());
    int type = data.substring(0, 1).toInt();

    if (type == 1) {
      setColor(message);
    } else if (type == 2) {
      rainbow();
    } else if (type == 3) {
      wheelControll(message);
    } else if (type == 4) {
      earLeds(message);
    }
  }
}
