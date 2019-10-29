import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import SubTitle from '../Subtitle/Subtitle';
import convertToDollars from '../../utils/currency';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SpendingGoalDisplay = ({goal, toggleEditGoal}) => (
  <View>
    <TouchableOpacity style={styles.row} onPress={toggleEditGoal}>
      <SubTitle subtitle="Spending Goal " />
      <MaterialIcons name="edit" size={18} color="white" />
    </TouchableOpacity>
    <Text style={styles.text}>{convertToDollars(parseFloat(goal))}</Text>
  </View>
);

export default SpendingGoalDisplay;
