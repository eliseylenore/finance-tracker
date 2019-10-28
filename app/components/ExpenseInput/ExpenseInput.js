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
      expenseName,
      expenseAmount,
      onChangeText,
      inputPlaceholder,
      onDoneAddItem,
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
          <TouchableOpacity style={[styles.submitButton, styles.elevated]}>
            <Text onPress={onDoneAddItem}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ExpenseInput;
