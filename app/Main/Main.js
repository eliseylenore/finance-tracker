import React, {Component} from 'react';
import {
  Alert,
  Text,
  StatusBar,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../components/Header/Header';
import ExpenseInput from '../components/ExpenseInput/ExpenseInput';
import AddExpensesButton from '../components/ExpenseInput/AddExpensesButton';
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
      totalSpent: 0,
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

  findTotalSpent(allItems) {
    let totalSpent = 0;
    for (var item in allItems) {
      totalSpent += parseInt(allItems[item].amount);
    }
    return totalSpent;
  }

  newGoalValue = value => {
    this.setState({
      spendingGoalInput: value,
    });
  };

  loadingItem = async () => {
    try {
      const allItems = await AsyncStorage.getItem('Todos');
      const goal = await AsyncStorage.getItem('Goal');
      const totalSpent = this.findTotalSpent(JSON.parse(allItems) || {});
      this.setState({
        totalSpent: totalSpent,
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
    console.log(expenseDescription.length);
    console.log(expenseAmount);
    if (!parseInt(expenseAmount)) {
      console.log('expense is 0');
      Alert.alert('Error', 'Amount must be more than 0');
    } else if (expenseDescription.length < 3) {
      Alert.alert(
        'Error',
        'Expense description must be more than 3 letters long.',
      );
    } else {
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
            expenseAmount: '',
            expenseDescription: '',
            totalSpent: prevState.totalSpent + parseInt(expenseAmount),
            allItems: {
              ...prevState.allItems,
              ...newItemObject,
            },
          };
          this.saveItems(newState.allItems);
          return {...newState};
        });
      }
    }
  };

  onDoneAddGoal = () => {
    const {spendingGoalInput} = this.state;
    if (!spendingGoal) {
      Alert.alert('Error', 'Must provide a goal larger than 1');
    } else {
      if (spendingGoalInput != '') {
        this.setState({
          spendingGoal: parseFloat(spendingGoalInput).toFixed(2),
        });
      }
      this.saveGoal(parseFloat(spendingGoalInput).toFixed(2));
    }
  };

  saveItems = newItem => {
    const saveItem = AsyncStorage.setItem('Todos', JSON.stringify(newItem));
  };
  saveGoal = newItem => {
    const saveItem = AsyncStorage.setItem('Goal', JSON.stringify(newItem));
  };

  toggleAddExpenses = () => {
    if (this.state.addExpenses) {
      this.setState({addExpenses: false});
    } else {
      this.setState({addExpenses: true});
    }
  };

  deleteItem = id => {
    this.setState(prevState => {
      const allItems = prevState.allItems;
      const thisAmount = prevState.totalSpent - allItems[id].amount;
      delete allItems[id];
      const newState = {
        ...prevState,
        totalSpent: thisAmount,
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
      addExpenses,
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
              <View style={styles.goalSpentContainer}>
                <SpendingGoalDisplay goal={spendingGoal} />
                {loadingItems ? (
                  <View style={styles.totalSpent}>
                    <SubTitle subtitle="Total spent" />
                    <Text style={styles.text}>
                      ${this.state.totalSpent.toFixed(2)}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
            <View styles={styles.expensesContainer}>
              {addExpenses ? (
                <View>
                  <AddExpensesButton
                    toggleAddExpenses={this.toggleAddExpenses}
                    addExpenses={addExpenses}
                  />
                  <ExpenseInput
                    onChangeText={this.newInputValue}
                    onDoneAddItem={this.onDoneAddItem}
                  />
                </View>
              ) : loadingItems ? (
                <ScrollView contentContainerStyle={styles.scrollableList}>
                  <View style={styles.expensesHeaderContainer}>
                    {Object.keys(allItems).length ? (
                      <SubTitle subtitle="Expenses" />
                    ) : null}
                    <AddExpensesButton
                      toggleAddExpenses={this.toggleAddExpenses}
                      addExpenses={addExpenses}
                    />
                  </View>
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
