import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default (styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 24,
  },
  input: {
    paddingTop: 10,
    fontSize: 24,
    color: 'white',
    fontWeight: '500',
  },
}));
