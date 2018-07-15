import React from 'react';
import { TouchableOpacity, Text, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo';

const deviceWidth = Dimensions.get('window').width;

const Button = ({ onPress, colors, text, textColor, loading, disabled }) => (
  <TouchableOpacity onPress={onPress} style={styles.button} disabled={disabled}>
    <LinearGradient start={[0.1, 0]} end={[1, 0]} colors={colors} style={styles.linearStyle}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
      )}
    </LinearGradient>
  </TouchableOpacity>
);

export default Button;

const styles = {
  button: {
    width: deviceWidth * 0.95,
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d6d6d6',
    marginVertical: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  linearStyle: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 3
  }
};
