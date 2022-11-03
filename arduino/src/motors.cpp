#include <headers/motors.h>

#define MOTOR_LEFT_F 7
#define MOTOR_LEFT_B 6
#define MOTOR_RIGHT_F 5
#define MOTOR_RIGHT_B 4

void setupMotors() {
  pinMode(MOTOR_LEFT_F, OUTPUT);
  pinMode(MOTOR_LEFT_B, OUTPUT);
  pinMode(MOTOR_RIGHT_F, OUTPUT);
  pinMode(MOTOR_RIGHT_B, OUTPUT);
}

void moveForward() {
  analogWrite(MOTOR_LEFT_F, 255);
  analogWrite(MOTOR_LEFT_B, 0);
  analogWrite(MOTOR_RIGHT_F, 255);
  analogWrite(MOTOR_RIGHT_B, 0);
}

void moveBackward() {
  analogWrite(MOTOR_LEFT_F, 0);
  analogWrite(MOTOR_LEFT_B, 255);
  analogWrite(MOTOR_RIGHT_F, 0);
  analogWrite(MOTOR_RIGHT_B, 255);
}

void moveLeft() {
  analogWrite(MOTOR_LEFT_F, 50);
  analogWrite(MOTOR_LEFT_B, 0);
  analogWrite(MOTOR_RIGHT_F, 255);
  analogWrite(MOTOR_RIGHT_B, 0);
}

void moveRight() {
  analogWrite(MOTOR_LEFT_F, 255);
  analogWrite(MOTOR_LEFT_B, 0);
  analogWrite(MOTOR_RIGHT_F, 50);
  analogWrite(MOTOR_RIGHT_B, 0);
}

void stop() {
  digitalWrite(MOTOR_LEFT_F, LOW);
  digitalWrite(MOTOR_LEFT_B, LOW);
  digitalWrite(MOTOR_RIGHT_F, LOW);
  digitalWrite(MOTOR_RIGHT_B, LOW);
}

void wheelControll(String message) {
  char command = message[0];

  switch (command) {
    case 'u':
      moveForward();
      Serial.println("up");
      break;
    case 'r':
      moveRight();
      Serial.println("right");
      break;
    case 'l':
      moveLeft();
      Serial.println("left");
      break;
    case 'd':
      moveBackward();
      Serial.println("down");
      break;
    default:
      stop();
      Serial.println("stop");
      break;
  }
}
