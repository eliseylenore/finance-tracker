import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export default (styles = StyleSheet.create({
  input: {
    paddingTop: 10,
    fontSize: 24,
    color: 'grey',
    fontWeight: '500',
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    width: width - 50,
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    ...Platform.select({
      ios: {
        shadowColor: 'rgb(50,50,50)',
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 2,
          width: 0,
        },
      },
      android: {
        elevation: 5,
      },
    }),
  },
  text: {
    color: 'white',
    fontSize: 24,
  },
}));