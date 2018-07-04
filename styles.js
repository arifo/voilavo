import { StyleSheet } from 'react-native';

const Dimensions = require('Dimensions');

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfdfdf'
  },
  color: {
    color: '#df4723'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  images: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.3,
    margin: 4
  },
  imgRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  TextInput: {
    width: deviceWidth,
    padding: 15,
    backgroundColor: '#fff',
    height: 100
  },
  bold: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    width: deviceWidth * 0.75,
    borderRadius: 25,
    borderWidth: 1
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  card: {
    width: deviceWidth * 0.9,
    height: deviceHeight * 0.75,
    borderRadius: 50
  },
  cardDescription: {
    padding: 15,
    justifyContent: 'flex-end',
    flex: 1
  },
  cardInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10
  }
});

export default styles;
