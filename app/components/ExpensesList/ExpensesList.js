import React, {Component} from 'react';
import {Text, View, Dimensions, Platform, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import {deleteIconColor} from '../../utils/colors';
class ExpensesList extends Component {
  render() {
    MaterialIcons.loadFont();
    const {description, amount, deleteItem, id} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <Text style={[styles.text]}>{description}</Text>
          <Text style={[styles.text]}>${parseInt(amount).toFixed(2)}</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity onPressOut={() => deleteItem(id)}>
            <MaterialIcons name="delete" size={24} color={deleteIconColor} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ExpensesList;
