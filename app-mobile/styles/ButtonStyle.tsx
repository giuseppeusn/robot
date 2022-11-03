import {StyleSheet} from 'react-native';

export const ButtonStyle = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: '#33166e',
    borderColor: 'white',
    borderWidth: 2,
  },
  buttonTxt: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 5,
    textTransform: 'uppercase',
  },
});
