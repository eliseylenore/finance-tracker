import {StyleSheet} from 'react-native';

export default (styles = StyleSheet.create({
  progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 5,
  },
  barContainer: {
    padding: 3,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 15,
  },
}));
