import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {bg, lightWhite, itemListText} from './utils/colors';
import Header from './components/Header';
import Input from './components/input';
import ExpensesList from './components/ExpensesList';
import uuid from 'uuid/v1';

const headerTitle = 'Finance Tracker';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      loadingItems: false,
      allItems: {},
      isCompleted: false,
    };
  }

  componentDidMount = () => {
    this.loadingItem();
  };

  newInputValue = value => {
    this.setState({
      inputValue: value,
    });
  };

  loadingItem = async () => {
    try {
      const allItems = await AsyncStorage.getItem('Todos');
      this.setState({
        loadingItems: true,
        allItems: JSON.parse(allItems) || {},
      });
    } catch (err) {
      console.log(err);
    }
  };

  onDoneAddItem = () => {
    const {inputValue} = this.state;
    if (inputValue != '') {
      this.setState(prevState => {
        const id = uuid();
        const newItemObject = {
          [id]: {
            id,
            isCompleted: false,
            text: inputValue,
            createdAt: Date.now(),
          },
        };
        const newState = {
          ...prevState,
          inputValue: '',
          allItems: {
            ...prevState.allItems,
            ...newItemObject,
          },
        };
        this.saveItems(newState.allItems);
        return {...newState};
      });
    }
  };

  saveItems = newItem => {
    const saveItem = AsyncStorage.setItem('Todos', JSON.stringify(newItem));
  };

  deleteItem = id => {
    this.setState(prevState => {
      const allItems = prevState.allItems;
      delete allItems[id];
      const newState = {
        ...prevState,
        ...allItems,
      };
      this.saveItems(newState.allItems);
      return {...newState};
    });
  };

  completeItem = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        allItems: {
          ...prevState.allItems,
          [id]: {
            ...prevState.allItems[id],
            isCompleted: true,
          },
        },
      };
      this.saveItems(newState.allItems);
      return {...newState};
    });
  };

  incompleteItem = id => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        allItems: {
          ...prevState.allItems,
          [id]: {
            ...prevState.allItems[id],
            isCompleted: false,
          },
        },
      };
      this.saveItems(newState.allItems);
      return {...newState};
    });
  };

  render() {
    const {inputValue, loadingItems, allItems} = this.state;
    return (
      <View style={styles.background}>
        <StatusBar barStyle="light-content" style={styles.container} />
        <View style={styles.centered}>
          <Header title={headerTitle} />
        </View>
        <View styles={styles.inputContainer}>
          <Input
            inputValue={inputValue}
            onChangeText={this.newInputValue}
            onDoneAddItem={this.onDoneAddItem}
          />
        </View>
        {loadingItems ? (
          <ScrollView contentContainerStyle={styles.scrollableList}>
            {Object.values(allItems)
              .reverse()
              .map(item => (
                <ExpensesList
                  key={item.id}
                  {...item}
                  deleteItem={this.deleteItem}
                  completeItem={this.completeItem}
                  incompleteItem={this.incompleteItem}
                />
              ))}
          </ScrollView>
        ) : (
          <ActivityIndicator size="large" color="white" />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: bg,
  },
  centered: {
    alignItems: 'center',
  },
  inputContainer: {
    marginTop: 40,
    paddingLeft: 15,
  },
});

export default Main;
