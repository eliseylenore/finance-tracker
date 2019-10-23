import {StyleSheet, Dimensions} from 'react-native';
import {bg, lightWhite, itemListText} from '../utils/colors';
const {height, width} = Dimensions.get('window');

export default (styles = StyleSheet.create({
  expensesContainer: {
    width: width - 50,
  },
  expensesHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
    marginTop: 40,
  },
  inputContainer: {
    marginTop: 40,
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
