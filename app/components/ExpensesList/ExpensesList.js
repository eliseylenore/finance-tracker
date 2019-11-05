import React, {Component} from 'react';
import {Text, View, Dimensions, Platform, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import {deleteIconColor} from '../../utils/colors';
import convertToDollars from '../../utils/currency';
class ExpensesList extends Component {
  calculateDate(dateInMilliseconds) {
    let date = new Date(dateInMilliseconds);
    let dateString =
      date.getMonth() + 1 + '/' + date.getDate() + '/' + (date.getYear() - 100);
    return dateString;
  }
  render() {
    MaterialIcons.loadFont();
    const {
      description,
      amount,
      category,
      deleteItem,
      id,
      createdAt,
      toggleEditExpense,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <Text style={[styles.text, styles.description]}>
            {description} {category}
          </Text>
          <Text style={styles.text}>{this.calculateDate(createdAt)}</Text>
          <Text style={[styles.text]}>
            {convertToDollars(parseFloat(amount))}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPressOut={() => toggleEditExpense(id)}>
            <MaterialIcons name="edit" size={18} color={deleteIconColor} />
          </TouchableOpacity>
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
