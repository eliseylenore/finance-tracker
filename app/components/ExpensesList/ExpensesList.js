import React, {Component} from 'react';
import {Text, View, Dimensions, Platform, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import {deleteIconColor} from '../../utils/colors';
import convertToDollars from '../../utils/currency';
import firebase from 'firebase'

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
      date,
      deleteItem,
      id,
      createdAt,
      toggleEditExpense,
    } = this.props;
    const pickerIcons = {
      Rent: 'home',
      Donations: 'people',
      Food: 'shopping-cart',
      Gas: 'local-gas-station',
    };
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <MaterialIcons
            name={pickerIcons[category]}
            size={18}
            color={deleteIconColor}
          />
          <Text style={[styles.text, styles.description]}>{description}</Text>
          <Text style={styles.text}>{date}</Text>
          <Text style={[styles.text]}>
            {convertToDollars(parseFloat(amount))}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPressOut={() => toggleEditExpense(id)}>
            <MaterialIcons name="edit" size={18} color={deleteIconColor} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPressOut={() => deleteItem(id)}>
            <MaterialIcons name="delete" size={24} color={deleteIconColor} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ExpensesList;
