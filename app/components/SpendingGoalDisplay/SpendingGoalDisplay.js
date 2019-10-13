import React, {Component} from 'react';
import {TextInput, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

function SpendingGoalDisplay(props) {
  return <Text style={styles.text}>Your Goal ${props.goal}</Text>;
}

export default SpendingGoalDisplay;
