import {StyleSheet, Dimensions} from 'react-native';
import {whileStatement} from '@babel/types';
import itemListText from '../../utils/colors';

export default (styles = StyleSheet.create({
  modalElevated: {
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 2,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  addExpenseButton: {
    color: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
}));
