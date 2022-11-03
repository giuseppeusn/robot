import {StyleSheet} from 'react-native';

export const HomeStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    width: 300,
  },
  listContainer: {
    backgroundColor: '#33166e',
    margin: 15,
    padding: 10,
    borderRadius: 10,
  },
  connected: {
    backgroundColor: 'green',
  },
  bleBtn: {
    alignItems: 'center',
  },
  buttons: {
    alignItems: 'flex-start',
  },
  rightMenu: {
    width: '50%',
    margin: 10,
  },
  circleIcon: {
    marginLeft: 5,
  },
});
