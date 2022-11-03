import React, {useContext, useState} from 'react';
import {Pressable, Modal, View, StyleSheet, Text} from 'react-native';
import ColorPicker, {
  Panel3,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';
import AppContext from '../context/AppContext';

const customSwatches = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#00ffff',
  '#ff00ff',
  '#ffff00',
  '#ffffff',
  '#ff8c00',
  '#006400',
  '#008080',
  '#ee82ee',
  '#8b008b',
];

interface Props {
  showColor: boolean;
  setShowColor: (showModal: boolean) => void;
}

interface selectColor {
  hex: string;
}

export default function ColorWheel({showColor, setShowColor}: Props) {
  const [color, setColor] = useState('#ffff');

  const {writeMessage} = useContext(AppContext) as any;

  const onSelectColor = ({hex}: selectColor) => {
    setColor(hex);

    const hexFormatted = hex.replace('#', '').toUpperCase();
    writeMessage('1', `0x${hexFormatted}`);
  };

  return (
    <Modal visible={showColor} animationType="slide" statusBarTranslucent>
      <View style={ColorWheelStyle.mainContainer}>
        <ColorPicker value={color} onComplete={onSelectColor}>
          <View style={ColorWheelStyle.container}>
            <Panel3 style={ColorWheelStyle.panel} />
            <View style={ColorWheelStyle.right}>
              <Preview hideInitialColor hideText />
              <HueSlider
                thumbShape="triangleDown"
                style={ColorWheelStyle.sliders}
              />
              <OpacitySlider
                thumbShape="triangleUp"
                style={ColorWheelStyle.sliders}
              />
              <Swatches colors={customSwatches} />
              <Pressable
                onPress={() => setShowColor(false)}
                style={ColorWheelStyle.button}>
                <Text style={ColorWheelStyle.text}>Close</Text>
              </Pressable>
            </View>
          </View>
        </ColorPicker>
      </View>
    </Modal>
  );
}

const ColorWheelStyle = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '100%',
    padding: 10,
    backgroundColor: '#3c1b7d',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  panel: {
    alignItems: 'center',
    width: '40%',
  },
  right: {
    alignItems: 'center',
    // alignContent: 'space-around',
    justifyContent: 'space-around',
    // height: '100%',
    width: '40%',
  },
  sliders: {
    width: '100%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
    width: '50%',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
});
