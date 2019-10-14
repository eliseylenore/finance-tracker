import React, {Component} from 'react';
import {TextInput, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import SubTitle from '../Subtitle/Subtitle';

const SpendingGoalDisplay = ({goal}) => (
  <View>
    <SubTitle subtitle="Spending Goal" />
    <Text style={styles.text}>${goal}</Text>
  </View>
);

export default SpendingGoalDisplay;
