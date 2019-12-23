import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import User from '../User';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../constants/styles';
import firebase from 'firebase';
import Main from '../Main/Main';

export default class HomeScreen extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    let dbRef = firebase.database().ref('users');
    dbRef.on('child_added', newUser => {
      let person = newUser.val();
      person.phone = newUser.key;
      if (person.phone === User.phone) {
        User.name = person.name;
      } else {
        this.setState(prevState => {
          return {
            users: [...prevState.users, person],
          };
        });
      }
    });
  }

  _logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Main />
        <TouchableOpacity onPress={this._logout} style={styles.marginBottom}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
