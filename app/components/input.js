import React from 'react';
import {StyleSheet, TextInput, Text} from 'react-native';
import inputPlaceholder from '../utils/colors';

const TEMP_BASE_PRICE = '0';

const Input = ({inputValue, onChangeText, onDoneAddItem}) => (
  <TextInput
    style={styles.input}
    value={inputValue}
    onChangeText={onChangeText}
    placeholder="Enter an expense"
    placeholderTextColor={inputPlaceholder}
    multiline={true}
    autoCapitalize="sentences"
    underlineColorAndroid="transparent"
    selectionColor={'white'}
    maxLength={30}
    returnKeyType="done"
    autoCorrect={false}
    blurOnSubmit={true}
    keyboardType="numeric"
    defaultValue={TEMP_BASE_PRICE}
    onSubmitEditing={onDoneAddItem}
  />
);

const styles = StyleSheet.create({
  input: {
    paddingTop: 10,
    paddingRight: 15,
    fontSize: 34,
    color: 'white',
    fontWeight: '500',
  },
});

export default Input;
