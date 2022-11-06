#include <headers/leds.h>

#define LED_PIN     8
#define NUM_LEDS    6
#define BRIGHTNESS  255
#define LED_TYPE    WS2812B
#define COLOR_ORDER GRB

#define EAR_LEDS 23

CRGB leds[NUM_LEDS];

void setupLeds() {
  FastLED.addLeds<LED_TYPE, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS);
  FastLED.setBrightness(BRIGHTNESS);
  FastLED.clear();

  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = CRGB(0,150,255);
  }

  FastLED.show();

  pinMode(EAR_LEDS, OUTPUT);
}

void blinkEarUnderstood() {
  digitalWrite(EAR_LEDS, LOW);
  delay(100);
  digitalWrite(EAR_LEDS, HIGH);
  delay(100);
  digitalWrite(EAR_LEDS, LOW);
  delay(100);
  digitalWrite(EAR_LEDS, HIGH);
  delay(100);
  digitalWrite(EAR_LEDS, LOW);
}

void blinkEarNotUnderstood() {
  digitalWrite(EAR_LEDS, LOW);
  delay(800);
  digitalWrite(EAR_LEDS, HIGH);
  delay(800);
  digitalWrite(EAR_LEDS, LOW);
}

void earLeds(String data) {
  if (data == "listening") {
    digitalWrite(EAR_LEDS, HIGH);
  } else if (data == "notUnderstood") {
    blinkEarNotUnderstood();
  } else {
    blinkEarUnderstood();
  }
}

void setColor(String data) {
  Serial.println(data);
  long color = strtol(data.c_str(), NULL, 16);

  for (int i = 0; i < NUM_LEDS; i++) {
    leds[i] = color;
  }

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
