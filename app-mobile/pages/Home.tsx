import React, {useState, useContext} from 'react';
import {View, Text, Pressable} from 'react-native';
import Bluetooth from '../components/Bluetooth';
import ColorWheel from '../components/ColorWheel';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import AppContext from '../context/AppContext';
import {HomeStyle} from '../styles/HomeStyle';
import {ButtonStyle} from '../styles/ButtonStyle';
import Dpad from '../components/Dpad';
import Voice from '../components/Voice';

const Home = () => {
  const {connected, writeMessage} = useContext(AppContext) as any;

  const [showColor, setShowColor] = useState(false);
  const [showBle, setShowBle] = useState(false);

  return (
    <View style={HomeStyle.container}>
      <Dpad />
      <View style={HomeStyle.rightMenu}>
        <View style={HomeStyle.bleBtn}>
          <Voice />
          <Pressable
            onPress={() => setShowBle(true)}
            style={ButtonStyle.button}>
            <MaterialComIcon
              name={!connected ? 'bluetooth' : 'bluetooth-connect'}
              size={20}
              color="white"
            />
            <Text style={ButtonStyle.buttonTxt}>
              {!connected ? 'Disconnected' : 'Connected'}
            </Text>
            <MaterialIcon
              name="circle"
              size={10}
              color={!connected ? 'red' : 'green'}
              style={HomeStyle.circleIcon}
            />
          </Pressable>
        </View>
        <View style={HomeStyle.buttons}>
          <Bluetooth showBle={showBle} setShowBle={setShowBle} />
          <ColorWheel showColor={showColor} setShowColor={setShowColor} />
          <Pressable
            onPress={() => setShowColor(true)}
            style={ButtonStyle.button}>
            <IonIcon name="color-palette-outline" size={20} color="white" />
          </Pressable>
          <Pressable
            onPress={() => writeMessage('2', 'RGB')}
            style={ButtonStyle.button}>
            <Text>RGB</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Home;
