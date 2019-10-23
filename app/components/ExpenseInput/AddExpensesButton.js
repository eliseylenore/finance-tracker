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
    const {addExpenses, toggleAddExpenses} = this.props;
    return (
      <TouchableOpacity
        onPressOut={toggleAddExpenses}
        style={styles.addExpenseButton}>
        <Text style={styles.text}>Add Expense</Text>
        {addExpenses ? (
          <MaterialIcons name="clear" size={18} color="white" />
        ) : (
          <MaterialIcons name="add" size={18} color="white" />
        )}
      </TouchableOpacity>
    );
  }
}

export default ExpenseInput;
