import {StyleSheet} from 'react-native';
import {bg, redText} from '../utils/colors';

export default (styles = StyleSheet.create({
  red: {
    color: redText,
  },
  expensesHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  background: {
    flex: 1,
  },
  centered: {
    alignItems: 'center',
  },
  inputContainer: {
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 24,
    paddingBottom: 15,
  },
  goalSpentContainer: {
    flexDirection: 'row',
  },
  totalSpent: {
    marginLeft: 20,
  },
}));
