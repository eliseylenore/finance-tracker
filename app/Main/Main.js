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
import SubTitle from '../components/Subtitle/Subtitle';

const headerTitle = 'Finance Tracker';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spendingGoal: '',
      spendingGoalInput: '',
      expenseDescription: '',
      expenseAmount: '',
      loadingItems: false,
      allItems: {},
      isCompleted: false,
      addExpenses: false,
    };
  }

  componentDidMount = () => {
    this.loadingItem();
  };

  newInputValue = key => val => {
    this.setState({
      [key]: val,
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
      const goal = await AsyncStorage.getItem('Goal');
      this.setState({
        loadingItems: true,
        allItems: JSON.parse(allItems) || {},
        spendingGoal: JSON.parse(goal),
      });
    } catch (err) {
      console.log(err);
    }
  };

  onDoneAddItem = () => {
    const {expenseAmount, expenseDescription} = this.state;
    if (expenseDescription != '' && expenseAmount != '') {
      this.setState(prevState => {
        const id = uuid();
        const newItemObject = {
          [id]: {
            id,
            isCompleted: false,
            description: expenseDescription,
            amount: expenseAmount,
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
        spendingGoal: parseFloat(spendingGoalInput).toFixed(2),
      });
    }
    this.saveGoal(parseFloat(spendingGoalInput).toFixed(2));
  };

  saveItems = newItem => {
    const saveItem = AsyncStorage.setItem('Todos', JSON.stringify(newItem));
  };
  saveGoal = newItem => {
    const saveItem = AsyncStorage.setItem('Goal', JSON.stringify(newItem));
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
            <View style={styles.inputContainer}>
              <SpendingGoalDisplay goal={spendingGoal} />
              <ExpenseInput
                inputValue={inputValue}
                onChangeText={this.newInputValue}
                onDoneAddItem={this.onDoneAddItem}
              />
            </View>
            {loadingItems ? (
              <ScrollView contentContainerStyle={styles.scrollableList}>
                <SubTitle subtitle="List of expenses" />
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
