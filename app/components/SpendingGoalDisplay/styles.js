import {StyleSheet, Dimensions} from 'react-native';

export default (styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 24,
    paddingBottom: 15,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
}));
