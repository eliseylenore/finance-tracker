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
import globalStyles from '../constants/styles';
import firebase from 'firebase';
import Main from '../Main/Main';
import CourseHeader from '../components/Header/CourseHeader';

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: CourseHeader,
  };

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
      <SafeAreaView style={globalStyles.container}>
        <Main />
        <TouchableOpacity
          onPress={this._logout}
          style={[
            globalStyles.marginBottom,
            globalStyles.button,
            globalStyles.elevated,
          ]}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
