import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const Header = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  container: {
    width: deviceWidth,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }
});
