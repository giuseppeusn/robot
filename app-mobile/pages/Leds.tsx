import React, {useState} from 'react';
import {StyleSheet, View, Pressable, Text} from 'react-native';
import Bluetooth from '../components/Bluetooth';
import ColorWheel from '../components/ColorWheel';

const Leds = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowModal(true)} style={styles.button}>
        <Text style={styles.text}>Color Picker</Text>
      </Pressable>
      <Bluetooth />
      <ColorWheel showModal={showModal} setShowModal={setShowModal} />
    </View>
  );
};

export default Leds;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00121a',
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
