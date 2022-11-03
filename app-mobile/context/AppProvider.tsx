import React, {useState} from 'react';
import AppContext from './AppContext';
import {ToastAndroid} from 'react-native';

const BluetoothSerial = require('rn-bluetooth');

function AppProvider({children}: any) {
  const [connected, setConnected] = useState('');

  const writeType = async (type: string) => {
    BluetoothSerial.write(type)
      .then((_res: Record<string, string>) => {
        // console.log(res);
      })
      .catch((err: Record<string, string>) => console.log(err.message));
  };

  const writeMessage = async (type: string, message: string) => {
    await writeType(type);

    BluetoothSerial.write(message)
      .then((_res: Record<string, string>) => {
        // console.log(res);
        ToastAndroid.show(
          `Writed type: ${type} with message: ${message}`,
          ToastAndroid.BOTTOM,
        );
      })
      .catch((err: Record<string, string>) => console.log(err.message));
  };

  const contextValue = {
    writeMessage,
    connected,
    setConnected,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export default AppProvider;
