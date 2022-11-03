import React, {useState, useEffect, useContext} from 'react';
import {View, Pressable} from 'react-native';
import AppContext from '../context/AppContext';
import DpadStyle from '../styles/DpadStyle';

const BTN_UP = 'up';
const BTN_RIGHT = 'right';
const BTN_LEFT = 'left';
const BTN_DOWN = 'down';

const COLOR_WHITE = 'white';
const COLOR_RED = 'red';

function Dpad() {
  const [isPressing, setIsPressing] = useState(false);
  const [whichDirection, setWhichDirection] = useState('');

  const {writeMessage} = useContext(AppContext) as any;

  useEffect(() => {
    if (whichDirection) {
      if (isPressing) {
        writeMessage('3', whichDirection);
      } else {
        writeMessage('3', 'stop');
      }
    }
  }, [isPressing, whichDirection, writeMessage]);

  const handlePress = (direction: string, pressing: boolean) => {
    setIsPressing(pressing);
    setWhichDirection(direction);
  };

  return (
    <View style={DpadStyle.joystick}>
      <View>
        <Pressable
          style={[
            DpadStyle.arrowUp,
            {
              borderBottomColor:
                isPressing && whichDirection === BTN_UP
                  ? COLOR_RED
                  : COLOR_WHITE,
            },
          ]}
          onPressIn={() => handlePress(BTN_UP, true)}
          onPressOut={() => handlePress(BTN_UP, false)}
        />
      </View>
      <View style={DpadStyle.middleArrows}>
        <Pressable
          style={[
            DpadStyle.arrowLeft,
            {
              borderEndColor:
                isPressing && whichDirection === BTN_LEFT
                  ? COLOR_RED
                  : COLOR_WHITE,
            },
          ]}
          onPressIn={() => handlePress(BTN_LEFT, true)}
          onPressOut={() => handlePress(BTN_LEFT, false)}
        />
        <Pressable
          style={[
            DpadStyle.arrowRight,
            {
              borderStartColor:
                isPressing && whichDirection === BTN_RIGHT
                  ? COLOR_RED
                  : COLOR_WHITE,
            },
          ]}
          onPressIn={() => handlePress(BTN_RIGHT, true)}
          onPressOut={() => handlePress(BTN_RIGHT, false)}
        />
      </View>
      <View>
        <Pressable
          style={[
            DpadStyle.arrowDown,
            {
              borderTopColor:
                isPressing && whichDirection === BTN_DOWN
                  ? COLOR_RED
                  : COLOR_WHITE,
            },
          ]}
          onPressIn={() => handlePress(BTN_DOWN, true)}
          onPressOut={() => handlePress(BTN_DOWN, false)}
        />
      </View>
    </View>
  );
}

export default Dpad;
