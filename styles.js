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

  //Profile Screen Styles
  profileImageContainer: {
    width: deviceWidth,
    height: deviceHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileBackgroundImage: {
    width: deviceWidth,
    height: deviceHeight * 0.4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  TextInput: {
    width: deviceWidth,
    padding: 15,
    backgroundColor: '#fff',
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#d4d5d6',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5
  }
});

export default styles;
