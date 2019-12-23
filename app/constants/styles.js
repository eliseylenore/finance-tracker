import React from 'react';
import {StyleSheet} from 'react-native';
import {bg} from '../utils/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: bg,
    paddingHorizontal: 20,
  },
  input: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCC',
    width: '80%',
  },
  marginBottom: {
    marginBottom: 50,
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

export default styles;
