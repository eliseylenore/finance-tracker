import React, {Component} from 'react';
import {TextInput, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

class SpendingGoalInput extends Component {
  render() {
    const {
      editGoal,
      spendingGoalInput,
      onChangeText,
      inputPlaceholder,
      onDoneAddGoal,
    } = this.props;
    return (
      <View>
        <Text style={styles.text}>
          {editGoal
            ? null
            : 'First things first: please input your spending goal.'}
        </Text>
        <TextInput
          style={styles.input}
          value={spendingGoalInput}
          onChangeText={onChangeText}
          placeholder="Enter your goal"
          placeholderTextColor={inputPlaceholder}
          multiline={true}
          underlineColorAndroid="transparent"
          selectionColor={'white'}
          maxLength={30}
          returnKeyType="done"
          autoCorrect={false}
          blurOnSubmit={true}
          keyboardType="numeric"
          onSubmitEditing={onDoneAddGoal}
        />
      </View>
    );
  }
}

export default SpendingGoalInput;
