import React, {Component} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../components/Header/Header';
import ExpenseInput from '../components/ExpenseInput/ExpenseInput';
import ExpensesList from '../components/ExpensesList/ExpensesList';
import SpendingGoalInput from '../components/SpendingGoalInput/SpendingGoalInput';
import SpendingGoalDisplay from '../components/SpendingGoalDisplay/SpendingGoalDisplay';
import uuid from 'uuid/v1';
import styles from './styles';

const headerTitle = 'Finance Tracker';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spendingGoal: '',
      spendingGoalInput: '',
      inputValue: '',
      loadingItems: false,
      allItems: {},
      isCompleted: false,
      addExpenses: false,
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

  newGoalValue = value => {
    console.log(value);
    this.setState({
      spendingGoalInput: value,
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
          addExpenses: false,
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

  onDoneAddGoal = () => {
    const {spendingGoalInput} = this.state;
    if (spendingGoalInput != '') {
      this.setState({
        spendingGoal: spendingGoalInput,
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
    const {
      inputValue,
      spendingGoal,
      spendingGoalInput,
      loadingItems,
      allItems,
    } = this.state;
    return (
      <View style={styles.background}>
        <StatusBar barStyle="light-content" style={styles.container} />
        <View style={styles.centered}>
          <Header title={headerTitle} />
        </View>
        {spendingGoal ? (
          <View>
            <SpendingGoalDisplay goal={spendingGoal} />
            <View style={styles.inputContainer}>
              <ExpenseInput
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
        ) : (
          <SpendingGoalInput
            spendingGoalInput={spendingGoalInput}
            onDoneAddGoal={this.onDoneAddGoal}
            onChangeText={this.newGoalValue}
          />
        )}
      </View>
    );
  }
}

export default Main;