import React, {Component} from 'react';
import {TextInput, Text, TouchableOpacity, View} from 'react-native';
import inputPlaceholder from '../../utils/colors';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TEMP_BASE_PRICE = '0';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addExpenses: false,
    };
  }

  toggleAddExpenses = () => {
    console.log('toggling expenses ' + this.state.addExpenses);
    if (this.state.addExpenses) {
      this.setState({addExpenses: false});
    } else {
      this.setState({addExpenses: true});
    }
    console.log('toggling expenses ' + this.state.addExpenses);
  };

  render() {
    const {
      inputValue,
      onChangeText,
      inputPlaceholder,
      onDoneAddItem,
    } = this.props;
    return (
      <View>
        {!this.state.addExpenses ? (
          <TouchableOpacity onPressOut={this.toggleAddExpenses}>
            <Text style={styles.text}>
              Add Expense
              <MaterialIcons name="add" size={24} color="white" />
            </Text>
          </TouchableOpacity>
        ) : (
          <View>
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
            <TouchableOpacity onPressOut={this.toggleAddExpenses}>
              <MaterialIcons name="clear" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

export default Input;
