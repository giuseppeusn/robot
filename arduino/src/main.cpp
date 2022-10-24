#include <Arduino.h>
#include <SoftwareSerial.h>
#include <FastLED.h>

#define LED_PIN     5
#define NUM_LEDS    6
#define BRIGHTNESS  255
#define LED_TYPE    WS2812B
#define COLOR_ORDER GRB
CRGB leds[NUM_LEDS];

SoftwareSerial HC06(3, 4); // RX, TX

void setup() {
  FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS);
  FastLED.setBrightness(BRIGHTNESS);
  FastLED.clear();

  Serial.begin(9600);
  HC06.begin(9600);
}

void setColor(String data) {
  String colorString = data.substring(1, data.length());
  long color = strtol(colorString.c_str(), NULL, 16);

  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = color;
  }

  Serial.println("Changed color");

  FastLED.show();
}

void rainbow() {
  for (int j = 0; j < 255; j++) {
    for (int i = 0; i < NUM_LEDS; i++) {
      leds[i] = CHSV(i - (j * 2), 255, BRIGHTNESS);
    }

    FastLED.show();

    delay(25);
  }
}

void loop() {
  if (HC06.available()) {
    String data = HC06.readString();
    int type = data.substring(0, 1).toInt();

    if (type == 1) {
      setColor(data);
    } else if (type == 2) {
      rainbow();
    }
  }
}
