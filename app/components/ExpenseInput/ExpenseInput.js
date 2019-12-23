import React, {Component} from 'react';
import {TextInput, Text, TouchableOpacity, View, Modal} from 'react-native';
import styles from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {deleteIconColor, inputPlaceholder} from '../../utils/colors';
import DatePicker from 'react-native-datepicker';

class ExpenseInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pickerDisplay: false,
      mode: 'date',
      show: false,
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
        title: 'None',
      },
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
    const pickerIcons = {
      Rent: 'home',
      Donations: 'people',
      Food: 'shopping-cart',
      Gas: 'local-gas-station',
    };

    const {
      onChangeText,
      onDoneAddItem,
      expenseName,
      expenseAmount,
      expenseCategory,
      editExpense,
      addExpenses,
      expenseDate,
      toggleEditExpense,
      toggleAddExpenses,
    } = this.props;

    return (
      <Modal animationType="slide">
        <View style={styles.inputContainer}>
          <TouchableOpacity style={{alignSelf: 'flex-end'}}>
            <Text onPress={editExpense ? toggleEditExpense : toggleAddExpenses}>
              <MaterialIcons name="clear" size={18} color="grey" />
            </Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, styles.elevated]}
            value={expenseName}
            placeholderTextColor={inputPlaceholder.toString()}
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
            <View style={{flexDirection: 'row'}}>
              {pickerIcons[expenseCategory] ? (
                <MaterialIcons
                  style={{alignSelf: 'center'}}
                  name={pickerIcons[expenseCategory]}
                  size={24}
                  color={deleteIconColor}
                />
              ) : null}
              <Text
                style={[
                  styles.input,
                  {paddingTop: 0},
                  {color: !expenseCategory ? inputPlaceholder : 'grey'},
                ]}>
                {expenseCategory ? ' ' + expenseCategory : 'Expense category'}
              </Text>
            </View>
            <MaterialIcons name="edit" size={24} color={deleteIconColor} />
          </TouchableOpacity>
          <Modal
            animationType="slide"
            visible={this.state.pickerDisplay}
            transparent={true}
            onRequestClose={() => console.log('close requested')}>
            <View
              style={[
                {
                  backgroundColor: 'white',
                  padding: 10,
                  bottom: 20,
                  left: 15,
                  right: 15,
                  borderRadius: 5,
                  position: 'absolute',
                  alignItems: 'center',
                },
                styles.modalElevated,
              ]}>
              <Text style={[styles.input, {fontWeight: 'bold'}]}>
                Categories
              </Text>
              {pickerValues.map((value, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      paddingTop: 4,
                      paddingBottom: 4,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() =>
                      this.selectPicker('expenseCategory', value.title)
                    }>
                    {value.title !== 'None' ? (
                      <MaterialIcons
                        style={styles.input}
                        name={pickerIcons[value.title]}
                        size={24}
                        color={deleteIconColor}
                      />
                    ) : null}
                    <Text style={styles.input}> {value.title} </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </Modal>
          <DatePicker
            style={{width: 200}}
            date={expenseDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2019-01-01"
            maxDate="2029-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
              // ... You can check the source to find the other keys.
            }}
            onDateChange={onChangeText('expenseDate')}
          />
          <TouchableOpacity style={[styles.submitButton, styles.elevated]}>
            <Text onPress={onDoneAddItem}>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default ExpenseInput;
