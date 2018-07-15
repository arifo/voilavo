import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo';
import moment from 'moment';

import { logoutAction, uploadImages, deleteImages, updateAboutMe } from '../redux/actions';
import styles from '../../styles';
import ImageContainer from '../components/ImageContainer';
import Button from '../components/Button';
import MiniHeader from '../components/MiniHeader';
import DiscoverySettings from '../components/DiscoverySettings';
import Header from '../components/Header';

class Profile extends Component {
  onLogoutPressed = () => {
    this.props.logoutAction();
  };

  getAge() {
    return moment().diff(moment(this.props.user.birthday, 'MM/DD/YYYY'), 'y');
  }

  splitString(stringToSplit) {
    const arrayOfStrings = stringToSplit.split(' ');
    return arrayOfStrings[0];
  }

  userGender() {
    if (this.props.user.gender === 'male') {
      return require('../assets/man.png');
    } else if (this.props.user.gender === 'female') {
      return require('../assets/woman.png');
    }
  }

  render() {
    const { user, loading } = this.props;
    return (
      <ScrollView>
        <View style={stylese.container}>
          <LinearGradient colors={['#013cb2', '#F0F0F0']} style={stylese.container}>
            <Header text="Profile" />
            <View style={styles.profileImageContainer}>
              {user.images[0] ? (
                <ImageBackground
                  source={{ uri: user.images[0] }}
                  style={styles.profileBackgroundImage}
                  blurRadius={3}
                  resizeMethod="resize"
                >
                  <Image
                    source={{ uri: user.images[0] }}
                    style={stylese.profileImage}
                    resizeMethod="resize"
                  />
                  <Text style={styles.imageText}>
                    {user.name}, {this.getAge()}
                  </Text>
                  <Text style={[styles.imageText, { fontSize: 16, fontWeight: '300' }]}>
                    {user.city}
                  </Text>

                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        //backgroundColor: '#4286f4',
                        backgroundColor: 'transparent',
                        padding: 5,
                        borderRadius: 4,
                        margin: 5
                      }}
                      onPress={() => this.props.navigation.navigate('EditProfile')}
                      //onPress={() => this.props.navigation.navigate('example')}
                    >
                      <Feather name="edit" size={18} color="white" />
                      <Text style={{ fontSize: 14, color: 'white', paddingLeft: 3 }}>
                        Edit Profile
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.9}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        //backgroundColor: '#4286f4',
                        backgroundColor: 'transparent',
                        padding: 5,
                        borderRadius: 4,
                        margin: 5
                      }}
                      onPress={() => this.props.navigation.navigate('Settings')}
                    >
                      <Feather name="settings" size={18} color="white" />
                      <Text style={{ fontSize: 14, color: 'white', paddingLeft: 3 }}>Settings</Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              ) : (
                <View style={styles.profileImageContainer}>
                  <Image
                    source={this.userGender()}
                    style={[styles.img, { width: 128, height: 128 }]}
                    resizeMode="center"
                  />
                  <Text style={styles.imageText}>
                    {user.name}, {this.getAge()}
                  </Text>
                  <Text style={[styles.imageText, { fontSize: 16, fontWeight: '300' }]}>
                    {user.city}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={{
                      flexDirection: 'row',
                      // borderWidth: 1,
                      backgroundColor: '#4286f4',
                      padding: 5,
                      borderRadius: 4,
                      marginVertical: 8
                    }}
                    //onPress={() => this.props.navigation.navigate('EditProfile')}
                    onPress={() => this.props.navigation.navigate('example')}
                  >
                    <Feather name="edit" size={18} color="white" />
                    <Text style={{ fontSize: 14, color: 'white', paddingLeft: 3 }}>
                      Edit Profile
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <MiniHeader text="Album" />
            <ImageContainer loading={loading} />

            <Button
              text="Logout"
              textColor="#424242"
              colors={['#eff1f2', '#c2c5c6']}
              onPress={this.onLogoutPressed}
            />
          </LinearGradient>
        </View>
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
    borderRadius: 64,
    borderWidth: 2,
    borderColor: 'white'
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
