import React, {Component} from 'react';
import {Text, View, Animated, TouchableOpacity} from 'react-native';
import styles from './styles';
import {StyleSheet} from 'react-native';

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      opacity: new Animated.Value(1),
    };
  }

  spendingGoalPercentage() {
    let percentage = this.props.totalSpent / this.props.spendingGoal;
    if (percentage > 1) {
      percentage = 1;
    }
    return percentage;
  }

  animateBar = () => {
    this.state.animation.setValue(0);
    this.state.opacity.setValue(1);
    Animated.timing(this.state.animation, {
      // set toValue to percentage (.8, .9, etc)
      toValue: this.spendingGoalPercentage(),
      duration: 1500,
    }).start();
  };
  render() {
    this.animateBar();
    const progressInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
      extrapolate: 'clamp',
    });
    const colorInterpolate = this.state.animation.interpolate({
      inputRange: [0, 0.7, 1],
      outputRange: ['green', '#ffd700', 'red'],
    });

    const progressStyle = {
      width: progressInterpolate,
      bottom: 0,
      backgroundColor: colorInterpolate,
      opacity: this.state.opacity,
    };
    return (
      <View style={styles.barContainer}>
        <TouchableOpacity onPress={this.animateBar}>
          <Text />
          <View style={StyleSheet.absoluteFill}>
            <Animated.View style={[styles.progress, progressStyle]} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
