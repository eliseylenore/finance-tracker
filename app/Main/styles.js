import {StyleSheet} from 'react-native';
import {bg, lightWhite, itemListText} from '../utils/colors';

export default (styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: bg,
    paddingLeft: 15,
  },
  centered: {
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 40,
    color: 'white',
  },
}));
