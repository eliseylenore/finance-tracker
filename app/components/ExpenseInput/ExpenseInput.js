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
        value: 'rent',
      },
      {
        title: 'Donations',
        value: 'donations',
      },
      {
        title: 'Food',
        value: 'food',
      },
      {
        title: 'Gas',
        value: 'gas',
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
        <Text>{expenseCategory}</Text>
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
          <TouchableOpacity onPress={() => this.togglePicker()}>
            <Text>Select a category</Text>
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
                left: 20,
                right: 20,
                position: 'absolute',
                alignItems: 'center',
              }}>
              <Text style={[styles.input, {fontWeight: 'bold'}]}>
                Please pick a value
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
                      this.selectPicker('expenseCategory', value.value)
                    }>
                    <Text style={styles.input}>{value.title}</Text>
                  </TouchableHighlight>
                );
              })}

              <TouchableHighlight style={{paddingTop: 4, paddingBottom: 4}}>
                <Text style={[styles.input, {color: '#999'}]}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </Modal>
          {/* <Picker
            selectedValue={expenseCategory}
            onValueChange={onChangeText('expenseCategory')}>
            <Picker.Item
              style={[styles.input, styles.elevated]}
              label="Category"
              value=""
            />
            <Picker.Item
              style={[styles.input, styles.elevated]}
              label="Food"
              value="food"
            />
            <Picker.Item label="Rent" value="rent" />
            <Picker.Item label="Donations" value="donations" />
          </Picker> */}
          <TouchableOpacity style={[styles.submitButton, styles.elevated]}>
            <Text onPress={onDoneAddItem}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ExpenseInput;
