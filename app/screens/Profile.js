import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import * as firebase from 'firebase';

import { logoutAction, uploadImages, deleteImages, updateAboutMe } from '../redux/actions';
import styles from '../../styles';
import ImageContainer from '../components/ImageContainer';
import Button from '../components/Button';
import Separator from '../components/Separator';

class Profile extends Component {
  onLogoutPressed = () => {
    this.props.logoutAction();
  };

  getAge() {
    return moment().diff(moment(this.props.user.birthday), 'y');
  }

  splitString(stringToSplit) {
    const arrayOfStrings = stringToSplit.split(' ');
    return arrayOfStrings[0];
  }

  render() {
    console.log(this.props.user);
    return (
      <ScrollView contentContainerStyle={stylese.container}>
        <View style={stylese.imageContainer}>
          <Image source={{ uri: this.props.user.images[0] }} style={stylese.profileImage} />
        </View>
        <Text style={stylese.imageText}>
          {this.splitString(this.props.user.name)}, {this.getAge()}
        </Text>
        <Separator />
        <ImageContainer loading={this.props.loading} />
        <Separator />
        <Text style={styles.bold}>About</Text>
        <TextInput
          style={styles.TextInput}
          multiline
          numberOfLines={5}
          onChangeText={text => this.props.updateAboutMe(text)}
          value={this.props.user.aboutMe}
          underlineColorAndroid="transparent"
        />
        <Separator />
        <Button
          text="Logout"
          colors={['#eff1f2', '#c2c5c6', '#424242']}
          onPress={this.onLogoutPressed}
        />
      </ScrollView>
    );
  }
}

const stylese = {
  container: {
    flex: 1,
    alignItems: 'center'
  },
  imageContainer: {
    height: 128,
    width: 128,
    borderRadius: 64,
    marginTop: 25
  },
  profileImage: {
    height: 128,
    width: 128,
    borderRadius: 64
  },
  imageText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
};

const mapStateToProps = state => {
  const { user, loading } = state.auth;

  return {
    user: state.auth.user,
    loading: state.auth,
    state: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logoutAction, uploadImages, deleteImages, updateAboutMe }
)(Profile);
