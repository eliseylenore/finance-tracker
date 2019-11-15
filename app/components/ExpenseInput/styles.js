import {StyleSheet, Dimensions} from 'react-native';
import {whileStatement} from '@babel/types';
import itemListText from '../../utils/colors';

export default (styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    fontSize: 24,
    color: 'grey',
    fontWeight: '400',
    paddingTop: 10,
  },
  elevated: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
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
  submitButton: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: 'white',
    color: itemListText,
    width: 90,
  },
  inputContainer: {
    marginTop: 40,
    marginHorizontal: 15,
  },
}));
