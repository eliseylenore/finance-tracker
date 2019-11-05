import React, {Component} from 'react';
import {TextInput, Text, TouchableOpacity, View, Picker} from 'react-native';
import styles from './styles';

class ExpenseInput extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    const {
      onChangeText,
      inputPlaceholder,
      onDoneAddItem,
      expenseName,
      expenseAmount,
      expenseCategory,
    } = this.props;

    return (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.elevated]}
            value={expenseName}
            placeholder="Description"
            onChangeText={onChangeText('expenseDescription')}
          />
          <TextInput
            style={[styles.input, styles.elevated]}
            value={expenseAmount}
            onChangeText={onChangeText('expenseAmount')}
            placeholder="Amount"
            placeholderTextColor={inputPlaceholder}
            multiline={true}
            autoCapitalize="sentences"
            underlineColorAndroid="transparent"
            selectionColor={'white'}
            maxLength={30}
            autoCorrect={false}
            blurOnSubmit={true}
            keyboardType="numeric"
          />
          <Picker
            style={[styles.input, styles.elevated]}
            selectedValue={expenseCategory}
            onValueChange={onChangeText('expenseCategory')}>
            <Picker.Item label="" value="" />
            <Picker.Item label="Food" value="food" />
            <Picker.Item label="Rent" value="rent" />
            <Picker.Item label="Donations" value="donations" />
          </Picker>
          <TouchableOpacity style={[styles.submitButton, styles.elevated]}>
            <Text onPress={onDoneAddItem}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ExpenseInput;
