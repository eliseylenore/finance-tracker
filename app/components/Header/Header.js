import React from 'react';
import {View, Text } from 'react-native';
import styles from './styles';

const Header = ({title}) => (
    <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
            {title.toUpperCase()}
        </Text>
    </View>
)

export default Header;
