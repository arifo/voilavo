import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import { logoutAction } from '../redux/actions';
import styles from '../../styles';

class Matches extends Component {
  onButtonPressed = () => {
    this.props.navigation.navigate('Chat');
  };
  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onButtonPressed}>
          <Text style={styles.button}>Button</Text>
        </TouchableOpacity>
        <Ionicons
          // style={{ marginTop: 70 }}
          color={'#df4723'}
          name={'ios-person-outline'}
          size={40}
        />
        <Image style={{ width: 50, height: 50 }} source={require('../assets/voosh-logo.png')} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn
});

export default connect(
  mapStateToProps,
  { logoutAction }
)(Matches);
