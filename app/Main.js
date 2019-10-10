import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    StatusBar,
    View
} from 'react-native';
import { bg, lightWhite } from './utils/colors'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { whileStatement } from '@babel/types';
import Header from './components/Header';
import Input from './components/input'

const headerTitle='Finance Tracker'

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        }
    }
    newInputValue = value => {
        this.setState({
            inputValue: value
        })
        console.log(this.state.inputValue)
    }
    render() {
        const {inputValue} = this.state
        return (
            <View style={styles.background}>
                <StatusBar barStyle="light-content" style={styles.container} />
                <View style={styles.centered}>
                    <Header title={headerTitle}></Header>  
                </View>
                <View styles={styles.inputContainer}>
                    <Input 
                        inputValue={inputValue} 
                        onChangeText={this.newInputValue}
                    />
                 </View>
                </View>
        )
    }
};

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
    }
});

export default Main;
