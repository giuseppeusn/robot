/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  FlatList,
  Text,
  ToastAndroid,
  Pressable,
  Modal,
} from 'react-native';
import uniqueArray from '../utils/uniqueArray';
import AlertAsync from 'react-native-alert-async';
import AppContext from '../context/AppContext';
import {BluetoothStyle} from '../styles/BluetoothStyle';
import {ButtonStyle} from '../styles/ButtonStyle';

const BluetoothSerial = require('rn-bluetooth');

type Error = {message: string};

interface Props {
  showBle: boolean;
  setShowBle: (showModal: boolean) => void;
}

const Bluetooth = ({showBle, setShowBle}: Props) => {
  const {connected, setConnected} = useContext(AppContext) as any;

  const [bleIsEnabled, setBleIsEnabled] = useState(true);
  const [devicesList, setDevicesList] = useState([]);
  const [discovering, setDiscovering] = useState(false);

  // const pairedMock = [
  //   {
  //     id: '00:11:22:33:44:55',
  //     name: 'Device 1',
  //   },
  //   {
  //     id: '00:11:22:33:44:56',
  //     name: 'Device 2',
  //   },
  //   {
  //     id: '00:11:22:33:44:57',
  //     name: 'Device 3',
  //   },
  //   {
  //     id: '00:11:22:33:44:58',
  //     name: 'Device 4',
  //   },
  //   {
  //     id: '00:11:22:33:44:59',
  //     name: 'Device 5',
  //   },
  //   {
  //     id: '00:11:22:33:44:60',
  //     name: 'Device 6',
  //   },
  //   {
  //     id: '00:11:22:33:44:61',
  //     name: 'Device 7',
  //   },
  // ];

  // const [connected, setConnected] = useState(pairedMock[0].id);

  useEffect(() => {
    BluetoothSerial.isEnabled()
      .then((value: boolean) => {
        setBleIsEnabled(value);
      })
      .catch((err: Error) => console.log(err));

    BluetoothSerial.list().then((devices: []) => setDevicesList(devices));

    BluetoothSerial.on('bluetoothDisabled', () => setBleIsEnabled(false));
    BluetoothSerial.on('connectionLost', () => setConnected(''));
  }, []);

  useEffect(() => {
    checkBluetooth();
  }, [bleIsEnabled]);

  const enableBle = () => {
    BluetoothSerial.enable();
    setBleIsEnabled(true);
  };

  const checkBluetooth = async () => {
    if (!bleIsEnabled) {
      const choice = await AlertAsync(
        'Bluetooth is disabled',
        'Enable Bluetooth to continue',
        [
          {
            text: 'Enable',
            onPress: () => {
              enableBle();
              return true;
            },
          },
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => false,
          },
        ],
      );
      return choice;
    }

    return true;
  };

  const connectBle = async (id: string) => {
    const bleOn = await checkBluetooth();

    if (!connected) {
      if (bleOn) {
        BluetoothSerial.connect(id)
          .then((res: Record<string, string>) => {
            console.log(res.message);
            setConnected(id);
            ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
          })
          .catch((err: Record<string, string>) => {
            ToastAndroid.show(err.message, ToastAndroid.BOTTOM);
            console.log(err.message);
          });
      }
    } else {
      BluetoothSerial.disconnect().then(() => {
        setConnected('');
        ToastAndroid.show('Disconnected', ToastAndroid.BOTTOM);
      });
    }
  };

  const findDevices = async () => {
    const bleOn = await checkBluetooth();

    if (bleOn) {
      if (!discovering) {
        setDiscovering(true);
        BluetoothSerial.discoverUnpairedDevices()
          .then((unpair: any) => {
            const allDevices: any = [...devicesList, ...unpair];
            setDevicesList(uniqueArray(allDevices));
            setDiscovering(false);
          })
          .catch((err: Error) => console.log(err));
      } else {
        BluetoothSerial.cancelDiscovery()
          .then(() => setDiscovering(false))
          .catch((err: Error) => console.log(err));
      }
    }
  };

  return (
    <Modal visible={showBle} animationType="slide" statusBarTranslucent>
      <View style={BluetoothStyle.container}>
        <View style={BluetoothStyle.listContainer}>
          <FlatList
            data={devicesList}
            renderItem={({item}: any) => (
              <View
                style={[
                  BluetoothStyle.list,
                  connected === item.id && BluetoothStyle.connected,
                ]}>
                <View>
                  <Text style={BluetoothStyle.text}>{item.name}</Text>
                  <Text style={BluetoothStyle.textId}>{item.id}</Text>
                </View>
                <Pressable
                  style={ButtonStyle.button}
                  onPress={() => connectBle(item.id)}>
                  <Text style={ButtonStyle.buttonTxt}>
                    {item.id === connected ? 'Disconnect' : 'Connect'}
                  </Text>
                </Pressable>
              </View>
            )}
          />
        </View>
        <View>
          <Pressable style={ButtonStyle.button} onPress={findDevices}>
            <Text style={ButtonStyle.buttonTxt}>
              {discovering ? 'Finding...' : 'Find devices'}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setShowBle(false)}
            style={ButtonStyle.button}>
            <Text style={ButtonStyle.buttonTxt}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default Bluetooth;
