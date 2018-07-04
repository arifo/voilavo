import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const Separator = () => <View style={styles.separator} />;

export default Separator;

const styles = {
  separator: {
    width: deviceWidth * 0.65,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d6d7d8',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  }
};
