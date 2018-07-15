import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import * as firebase from 'firebase';

import Button from '../components/Button';

class EditProfile extends Component {
  state = {};

  componentWillMount() {}

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30 }}>Edit Profile here</Text>
        <View style={styles.row}>
          <Text style={styles.text}>First Name</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Last Name</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Birthday</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Current Location</Text>
        </View>
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
  }
};

export default connect(mapStateToProps)(EditProfile);
