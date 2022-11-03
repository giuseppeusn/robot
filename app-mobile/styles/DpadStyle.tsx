import {StyleSheet} from 'react-native';

const DpadStyle = StyleSheet.create({
  joystick: {
    width: '46%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  arrowUp: {
    borderWidth: 50,
    borderColor: 'transparent',
    borderBottomColor: 'white',
    borderBottomWidth: 80,
  },
  arrowLeft: {
    borderWidth: 50,
    borderColor: 'transparent',
    borderEndColor: 'white',
    borderEndWidth: 80,
  },
  arrowRight: {
    borderWidth: 50,
    borderColor: 'transparent',
    borderStartColor: 'white',
    borderStartWidth: 80,
  },
  arrowDown: {
    borderWidth: 50,
    borderColor: 'transparent',
    borderTopColor: 'white',
    borderTopWidth: 80,
  },
  middleArrows: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default DpadStyle;
