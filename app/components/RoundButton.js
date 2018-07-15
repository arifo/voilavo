import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const sizeNew = 60;

const ClearButton = ({ text, onPress, icon, size, color }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={[styles.wrapper, { width: size, height: size, borderRadius: size / 2 }]}>
      <MaterialCommunityIcons name={icon} size={size * 0.65} color={color} />
      <Text style={styles.text}>{text}</Text>
    </View>
  </TouchableOpacity>
);

export default ClearButton;

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeNew,
    height: sizeNew,
    borderRadius: sizeNew / 2,
    backgroundColor: '#528ff2',
    borderColor: 'white',
    borderWidth: 2
  },
  text: {
    fontWeight: '300',
    color: 'white',
    fontSize: 16,
    paddingVertical: 20
  }
};
