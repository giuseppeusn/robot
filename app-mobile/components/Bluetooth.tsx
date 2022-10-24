import React, {useContext} from 'react';
import {Button, ToastAndroid, View} from 'react-native';
import AppContext from '../context/AppContext';

const BluetoothSerial = require('rn-bluetooth');

const deviceID = '98:DA:60:01:31:21';

function Bluetooth() {
  const {writeMessage} = useContext(AppContext) as any;

  const connect = (device: string) => {
    BluetoothSerial.connect(device)
      .then((res: Record<string, string>) => {
        console.log(res.message);
        ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
      })
      .catch((err: Record<string, string>) => console.log(err.message));
  };

  return (
    <View style={{flex: 1}}>
      <Button title="Conectar" onPress={() => connect(deviceID)} />
      <Button title="Rainbow" onPress={() => writeMessage('2', null)} />
    </View>
  );
}

export default Bluetooth;
