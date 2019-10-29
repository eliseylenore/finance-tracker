import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import SubTitle from '../Subtitle/Subtitle';
import convertToDollars from '../../utils/currency';

const SpendingGoalDisplay = ({goal}) => (
  <View>
    <SubTitle subtitle="Spending Goal" />
    <Text style={styles.text}>{convertToDollars(parseFloat(goal))}</Text>
  </View>
);

export default SpendingGoalDisplay;
