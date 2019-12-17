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
import ProgressBar from '../components/ProgressBar/ProgressBar';
import uuid from 'uuid/v1';
import styles from './styles';
import convertToDollars from '../utils/currency';
import SubTitle from '../components/Subtitle/Subtitle';

const headerTitle = 'Finance Tracker';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spendingGoal: '',
      spendingGoalInput: '',
      editGoal: false,
      itemToEdit: '',
      editExpense: false,
      expenseDescription: '',
      expenseAmount: '',
      expenseCategory: '',
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
    console.log('hi', key, val);
    this.setState({
      [key]: val,
    });
  };

  findTotalSpent(allItems) {
    let totalSpent = 0;
    for (var item in allItems) {
      totalSpent += parseFloat(allItems[item].amount);
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
    const {
      expenseAmount,
      expenseDescription,
      expenseToEdit,
      expenseCategory,
      editGoal,
    } = this.state;
    if (!parseFloat(expenseAmount)) {
      Alert.alert('Error', 'Amount must be more than 0');
    } else if (expenseDescription.length < 3) {
      Alert.alert(
        'Error',
        'Expense description must be more than 3 letters long.',
      );
    } else {
      if (expenseDescription != '' && expenseAmount != '') {
        if (expenseToEdit) {
          this.setState(prevState => {
            const itemObject = {
              id: expenseToEdit.id,
              isCompleted: false,
              description: expenseDescription,
              category: expenseCategory,
              amount: expenseAmount,
              createdAt: expenseToEdit.createdAt,
            };
            let prevAmount = prevState.allItems[expenseToEdit.id].amount;
            prevState.allItems[expenseToEdit.id] = itemObject;
            const newState = {
              ...prevState,
              addExpenses: false,
              editExpense: false,
              expenseAmount: '',
              expenseDescription: '',
              expenseCategory: '',
              expenseToEdit: '',
              totalSpent:
                prevState.totalSpent + parseFloat(expenseAmount - prevAmount),
              allItems: {
                ...prevState.allItems,
              },
            };
            this.saveItems(newState.allItems);
            return {...newState};
          });
        } else {
          this.setState(prevState => {
            const id = uuid();
            const newItemObject = {
              [id]: {
                id,
                isCompleted: false,
                category: expenseCategory,
                description: expenseDescription,
                amount: expenseAmount,
                createdAt: Date.now(),
              },
            };
            const newState = {
              ...prevState,
              addExpenses: false,
              editExpense: false,
              expenseAmount: '',
              expenseDescription: '',
              expenseCategory: '',
              expenseToEdit: '',
              totalSpent: prevState.totalSpent + parseFloat(expenseAmount),
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
    }
  };

  onDoneAddGoal = () => {
    const {spendingGoalInput} = this.state;
    if (!spendingGoalInput) {
      Alert.alert(
        'Error',
        'Must provide a goal larger than 1. Goal is currently ' +
          spendingGoalInput,
      );
    } else {
      if (spendingGoalInput != '') {
        this.setState({
          editGoal: false,
          spendingGoal: parseFloat(spendingGoalInput),
        });
      }
      this.saveGoal(spendingGoalInput);
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

  toggleEditExpense = id => {
    if (this.state.editExpense) {
      this.setState({
        editExpense: false,
        expenseToEdit: '',
        expenseAmount: 0,
        expenseDescription: 0,
      });
    } else {
      this.setState(prevState => {
        const allItems = prevState.allItems;
        const newState = {
          ...prevState,
          ...allItems,
          editExpense: true,
          expenseToEdit: prevState.allItems[id],
          expenseAmount: prevState.allItems[id].amount,
          expenseCategory: prevState.allItems[id].category,
          expenseDescription: prevState.allItems[id].description,
        };
        this.saveItems(newState.allItems);
        return {...newState};
      });
    }
  };

  toggleEditGoal = () => {
    this.state.editGoal
      ? this.setState({editGoal: false})
      : this.setState({editGoal: true});
  };

  deleteItem = id => {
    Alert.alert('Alert', 'Do you really want to delete this item?', [
      {
        text: 'OK',
        onPress: () =>
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
          }),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
      ,
    ]);
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
      editExpense,
      addExpenses,
      spendingGoal,
      spendingGoalInput,
      editGoal,
      loadingItems,
      allItems,
      totalSpent,
      expenseDescription,
      expenseAmount,
      expenseCategory,
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
                <SpendingGoalDisplay
                  goal={spendingGoal}
                  toggleEditGoal={this.toggleEditGoal}
                />
                {loadingItems ? (
                  <View style={styles.totalSpent}>
                    <SubTitle subtitle="Total spent" />
                    <Text
                      style={[
                        styles.text,
                        spendingGoal < totalSpent ? styles.red : null,
                      ]}>
                      {convertToDollars(totalSpent)}
                    </Text>
                  </View>
                ) : null}
              </View>
              <ProgressBar
                spendingGoal={spendingGoal}
                totalSpent={totalSpent}
              />
            </View>
            {this.state.editGoal ? (
              <SpendingGoalInput
                editGoal={editGoal}
                spendingGoalInput={spendingGoalInput}
                onDoneAddGoal={this.onDoneAddGoal}
                onChangeText={this.newGoalValue}
              />
            ) : (
              <View styles={styles}>
                {addExpenses ? (
                  <View>
                    <View style={styles.expensesHeaderContainer}>
                      <SubTitle subtitle="Add Expense" />
                      <AddExpensesButton
                        expenseCategory={expenseCategory}
                        expenseName={expenseDescription}
                        expenseAmount={expenseAmount}
                        toggleAddExpenses={this.toggleAddExpenses}
                        addExpenses={addExpenses}
                      />
                    </View>
                    <ExpenseInput
                      addExpenses={addExpenses}
                      toggleAddExpenses={this.toggleAddExpenses}
                      expenseCategory={expenseCategory}
                      expenseName={expenseDescription}
                      expenseAmount={expenseAmount}
                      onChangeText={this.newInputValue}
                      onDoneAddItem={this.onDoneAddItem}
                    />
                  </View>
                ) : editExpense ? (
                  <View>
                    <View style={styles.expensesHeaderContainer}>
                      <SubTitle subtitle="Edit Expense" />
                    </View>
                    <ExpenseInput
                      editExpense={editExpense}
                      toggleEditExpense={this.toggleEditExpense}
                      expenseCategory={expenseCategory}
                      expenseName={expenseDescription}
                      expenseAmount={expenseAmount}
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
                          toggleEditExpense={this.toggleEditExpense}
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
            )}
          </View>
        ) : (
          <SpendingGoalInput
            editGoal={editGoal}
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
