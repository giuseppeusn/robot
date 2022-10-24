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
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

interface selectColor {
  hex: string;
}

export default function ColorWheel({showModal, setShowModal}: Props) {
  const [color, setColor] = useState('#ffff');

  const {writeMessage} = useContext(AppContext) as any;

  const onSelectColor = ({hex}: selectColor) => {
    setColor(hex);

    const hexFormatted = hex.replace('#', '').toUpperCase();
    writeMessage('1', `0x${hexFormatted}`);
  };

  return (
    <View>
      <Modal visible={showModal} animationType="slide">
        <ColorPicker
          style={{width: '70%'}}
          value={color}
          onComplete={onSelectColor}>
          <Preview hideInitialColor hideText />
          <Panel3 />
          <HueSlider thumbShape="triangleDown" thumbColor="#00121a" />
          <OpacitySlider thumbShape="triangleUp" thumbColor="#00121a" />
          <Swatches colors={customSwatches} />
        </ColorPicker>

        <Pressable onPress={() => setShowModal(false)} style={styles.button}>
          <Text style={styles.text}>Close</Text>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
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
