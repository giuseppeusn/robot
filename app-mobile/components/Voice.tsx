import React, {useEffect, useState, useContext, useMemo} from 'react';
import {PICO_ACESS_KEY} from 'react-native-dotenv';
import {View, StyleSheet} from 'react-native';
import {PicovoiceManager} from '@picovoice/picovoice-react-native';
import {RhinoInference} from '@picovoice/rhino-react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppContext from '../context/AppContext';
import {type, commands} from '../utils/bleCommands';

const KEYWORD_PATH = 'keyword.ppn';
const CONTEXT_PATH = 'context.rhn';
const RHINO_SENSITIVITY = 1;
const PORCUPINE_SENSITIVITY = 0.5;
const PORCUPINE_PT_PARAMS = 'porcupine_params_pt.pv';
const RHINO_PT_PARAMS = 'rhino_params_pt.pv';

function Voice() {
  const [isListening, setIsListening] = useState(false);

  const {writeMessage} = useContext(AppContext) as any;

  const pico: PicovoiceManager = useMemo(() => {
    const wakeWord = () => {
      console.log('Wake word detected');

      setIsListening(true);
      writeMessage(type.earLeds, commands.earListening);
    };

    const inferenceCallback = (inference: RhinoInference) => {
      setIsListening(false);
      console.log(inference);

      const {isUnderstood, intent, slots} = inference;

      if (isUnderstood) {
        writeMessage(type.earLeds, commands.earUnderstood);

        setTimeout(() => {
          if (intent === 'EyesColor') {
            const color = slots?.color || 'vermelho';

            writeMessage(type.color, commands[color]);
          }
        }, 60);
      } else {
        writeMessage(type.earLeds, commands.earNotUnderstood);
      }
    };

    const errorCallback = (error: any) => {
      console.log(error);
    };

    return PicovoiceManager.create(
      PICO_ACESS_KEY,
      KEYWORD_PATH,
      wakeWord,
      CONTEXT_PATH,
      inferenceCallback,
      errorCallback,
      PORCUPINE_SENSITIVITY,
      RHINO_SENSITIVITY,
      PORCUPINE_PT_PARAMS,
      RHINO_PT_PARAMS,
    );
  }, [writeMessage]);

  useEffect(() => {
    pico
      .start()
      .then(() => console.log('Picovoice started'))
      .catch(err => console.log(err.message));

    return () => {
      pico
        .stop()
        .then(() => console.log('Picovoice stopped'))
        .catch(err => console.log(err.message));
    };
  }, [pico]);

  return (
    <View>
      <FontAwesome5
        name="microphone"
        size={30}
        color={isListening ? '#0095FF' : 'white'}
        style={style.icon}
      />
    </View>
  );
}

export default Voice;

const style = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});
