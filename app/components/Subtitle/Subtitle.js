import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

import {lighterWhite} from '../../utils/colors';

const SubTitle = ({subtitle}) => (
  <Text style={[{color: lighterWhite}]}>{subtitle.toUpperCase()}</Text>
);

export default SubTitle;
