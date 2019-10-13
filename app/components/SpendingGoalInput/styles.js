import {StyleSheet, Dimensions} from 'react-native';
import {itemListText} from '../../utils/colors';

const {height, width} = Dimensions.get('window');

export default (styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 24,
  },
  input: {
    paddingTop: 10,
    fontSize: 24,
    color: 'grey',
    fontWeight: '500',
  },
}));
