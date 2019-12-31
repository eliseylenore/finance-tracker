import React from 'react';
import {StyleSheet} from 'react-native';
import {bg} from '../utils/colors';

const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: bg,
    paddingHorizontal: 15,
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 20,
    color: 'grey',
    fontWeight: '400',
    paddingTop: 10,
  },
  elevated: {
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
  button: {
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  marginBottom: {
    paddingBottom: 50,
  },
  userContainer: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  buttonText: {
    color: 'darkblue',
    fontSize: 20,
  },
});

export default globalStyles;
