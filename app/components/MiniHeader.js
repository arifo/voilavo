import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const MiniHeader = ({ text }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

export default MiniHeader;

const styles = {
  container: {
    width: deviceWidth,
    height: 35,
    borderBottomWidth: 1,
    borderColor: '#cfd5d6',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#e2e0e0',
    paddingVertical: 3,
    paddingLeft: 3
  },
  text: {
    fontSize: 14,
    color: 'grey',
    fontWeight: '400',
    paddingLeft: 8
  }
};
