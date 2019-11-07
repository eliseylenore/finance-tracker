import React, {Component} from 'react';
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Picker,
  Modal,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {deleteIconColor} from '../../utils/colors';

class ExpenseInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerDisplay: false,
    };
  }

  togglePicker() {
    this.setState({
      pickerDisplay: !this.state.pickerDisplay,
    });
  }

  selectPicker(key, value) {
    this.togglePicker();
    this.props.onChangeText(key)(value);
  }

  render() {
    const pickerValues = [
      {
        title: 'Rent',
      },
      {
        title: 'Donations',
      },
      {
        title: 'Food',
      },
      {
        title: 'Gas',
      },
    ];
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
          <TouchableOpacity
            style={[
              styles.elevated,
              styles.input,
              {
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                justifyContent: 'space-between',
              },
            ]}
            onPress={() => this.togglePicker()}>
            <Text style={[styles.input, {paddingTop: 0}]}>
              {expenseCategory ? expenseCategory : 'Expense Category'}
            </Text>
            <MaterialIcons name="edit" size={24} color={deleteIconColor} />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            visible={this.state.pickerDisplay}
            transparent={true}
            onRequestClose={() => console.log('close requested')}>
            <View
              style={{
                backgroundColor: 'white',
                padding: 10,
                bottom: 20,
                left: 15,
                right: 15,
                borderRadius: 5,
                position: 'absolute',
                alignItems: 'center',
              }}>
              <Text style={[styles.input, {fontWeight: 'bold'}]}>
                Categories
              </Text>
              {pickerValues.map((value, index) => {
                return (
                  <TouchableHighlight
                    key={index}
                    style={{
                      paddingTop: 4,
                      paddingBottom: 4,
                    }}
                    onPress={() =>
                      this.selectPicker('expenseCategory', value.title)
                    }>
                    <Text style={styles.input}>{value.title}</Text>
                  </TouchableHighlight>
                );
              })}

              <TouchableHighlight
                onPress={() => this.togglePicker()}
                style={{paddingTop: 4, paddingBottom: 4}}>
                <Text style={[styles.input, {color: '#999'}]}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </Modal>
          <TouchableOpacity style={[styles.submitButton, styles.elevated]}>
            <Text onPress={onDoneAddItem}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ExpenseInput;
