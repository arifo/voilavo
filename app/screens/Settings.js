import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, TextInput } from 'react-native';

import Button from '../components/Button';
import MiniHeader from '../components/MiniHeader';
import DiscoverySettings from '../components/DiscoverySettings';

class Settings extends Component {
  state = {};

  componentWillMount() {}

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Settings</Text>
        <MiniHeader text="Discovery Settings" />
        <DiscoverySettings />
        <MiniHeader text="Bio" />
        <TextInput
          style={styles.TextInput}
          placeholder="Something about yourself..."
          placeholderTextColor={'#c2c5c6'}
          multiline
          numberOfLines={5}
          onChangeText={text => this.props.updateAboutMe(text)}
          value={this.props.user.aboutMe}
          underlineColorAndroid="transparent"
        />
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
          colors={['#013cb2', '#02b2d1', '#c5eaf7']}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

const deviceWidth = Dimensions.get('window').width;

const styles = {
  container: {
    width: deviceWidth,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#e2e0e0'
  },
  row: {
    width: deviceWidth,
    height: 70,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#d4d5d6',
    paddingLeft: 3
  },
  text: {
    fontSize: 14,
    color: '#4f4f4f',
    fontWeight: '400',
    paddingLeft: 8
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
};

export default connect(mapStateToProps)(Settings);
