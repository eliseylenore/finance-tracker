import React, {Component} from 'react';
import {TextInput, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import inputPlaceholder from '../../utils/colors';

class ExpenseInput extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      addExpenses,
      expenseName,
      expenseAmount,
      onChangeText,
      inputPlaceholder,
      onDoneAddItem,
      toggleAddExpenses,
    } = this.props;
    return (
      <View>
        <TouchableOpacity
          onPressOut={toggleAddExpenses}
          style={styles.addExpenseButton}>
          <Text style={styles.text}>Add Expense</Text>
          {addExpenses ? (
            <MaterialIcons name="clear" size={24} color="white" />
          ) : (
            <MaterialIcons name="add" size={24} color="white" />
          )}
        </TouchableOpacity>
        {addExpenses ? (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={expenseName}
              placeholder="Description"
              onChangeText={onChangeText('expenseDescription')}
            />
            <TextInput
              style={styles.input}
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
            <TouchableOpacity style={styles.addExpenseButton}>
              <Text style={styles.text} onPress={onDoneAddItem}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
}

export default ExpenseInput;
