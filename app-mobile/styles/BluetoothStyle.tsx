import {StyleSheet} from 'react-native';

export const BluetoothStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    padding: 10,
    backgroundColor: '#3c1b7d',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    color: 'white',
  },
  textId: {
    fontSize: 12,
    color: 'white',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: 20,
    color: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    backgroundColor: '#33166e',
  },
  listContainer: {
    backgroundColor: '#33166e',
    margin: 15,
    padding: 10,
    borderRadius: 10,
    width: '70%',
  },
  connected: {
    backgroundColor: 'green',
  },
});
