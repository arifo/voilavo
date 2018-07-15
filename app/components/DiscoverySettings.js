import React, { Component } from 'react';
import { View, Dimensions, Slider, Text, Picker } from 'react-native';

const deviceWidth = Dimensions.get('window').width;

class DiscoverySettings extends Component {
  state = {
    location: '',
    lookingFor: ''
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.row,
            { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
          ]}
        >
          <Text style={styles.text}>Location</Text>
          <Picker
            selectedValue={this.state.location}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) => this.setState({ location: itemValue })}
          >
            <Picker.Item label="Current Location" value="current" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Maximum Distance</Text>
          <Slider style={{ marginTop: 5 }} />
        </View>
        <View
          style={[
            styles.row,
            { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
          ]}
        >
          <Text style={styles.text}>Looking For</Text>
          <Picker
            selectedValue={this.state.lookingFor}
            style={{ height: 50, width: 140 }}
            onValueChange={(itemValue, itemIndex) => this.setState({ lookingFor: itemValue })}
          >
            <Picker.Item label="Men" value="men" />
            <Picker.Item label="Women" value="women" />
          </Picker>
        </View>
      </View>
    );
  }
}
export default DiscoverySettings;

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
