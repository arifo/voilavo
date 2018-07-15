import React, { Component } from 'react';
import { View, Image, Alert, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

import firebaseConfig from '../config/firebaseConfig';
import fbConfig from '../config/fbConfig';
import RootNavigator from '../navigation/RootNavigator';
import * as actions from '../redux/actions';
import styles from '../../styles';

import Button from '../components/Button';

firebase.initializeApp(firebaseConfig);

class Login extends Component {
  state = {
    buttonLoading: false
  };

  componentWillMount() {
    const { toggleLoading, loginAction } = this.props;
    toggleLoading(true);

    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log('login');
        this.getUserFromDB('cards/', user.uid).then(userID => {
          const userData = this.isEmpty(this.props.fetchedUserData)
            ? userID
            : this.props.fetchedUserData;

          loginAction(user, userData);
        });
      } else {
        toggleLoading(false);
      }
    });
  }

  onLogin = () => {
    this.login();
  };

  onPhoneAuth = () => {
    //this.props.phoneAuthAction();
    console.log('phone auth');
  };

  getUserFromDB(ref, child) {
    return firebase
      .database()
      .ref(ref)
      .child(child)
      .once('value', snapshot => snapshot.val());
  }

  updateDB(fullPath, params) {
    firebase
      .database()
      .ref(fullPath)
      .update(params);
  }

  isEmpty(obj) {
    for (const key in obj) {
      return false;
    }
    return true;
  }

  login = async () => {
    this.props.toggleButtonLoading(true);
    this.setState({ buttonLoading: true });
    try {
      const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(fbConfig.APIKey, {
        permissions: ['public_profile', 'user_birthday', 'user_location', 'user_gender']
      });
      if (type === 'success') {
        const credential = await firebase.auth.FacebookAuthProvider.credential(token);
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=birthday,location,gender,picture.height(500)`
        );
        const { picture, birthday, gender, location } = await response.json();
        const photoURL = picture.data.url;
        console.log('large fbimage', photoURL);
        const city = (location && location.name) || 'Somewhere on Earth';
        const value = { photoURL, birthday, gender, city };
        this.props.saveFetchedUserData(value);

        firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential)
          .catch(error => {
            Alert.alert('Try Again');
            console.log(`firebase auth error${error}`);
          });
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ buttonLoading: false });
    }
  };

  render() {
    const { loading, loggedIn, buttonLoading } = this.props.state;

    if (this.props.loggedIn) {
      return <RootNavigator />;
    }
    return loading ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View style={[styles.container, styles.center, { backgroundColor: '#2d0009' }]}>
        <Image
          source={require('../assets/voosh-logo.png')}
          style={[styles.img, { width: 250, height: 180, marginVertical: 20 }]}
          resizeMode="contain"
        />
        <Button
          onPress={this.onLogin}
          colors={['#4c669f', '#3b5998']} //, '#192f6a'
          text="LOGIN WITH FACEBOOK"
          textColor="white"
          disabled={buttonLoading}
          loading={buttonLoading}
        />
        <Button
          onPress={this.onPhoneAuth}
          colors={['#eff1f2', '#c2c5c6']} // ,
          text="LOGIN WITH PHONENUMBER"
          textColor="#424242"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.loggedIn,
  fetchedUserData: state.auth.fetchedUserData,
  state: state.auth
});

export default connect(
  mapStateToProps,
  actions
)(Login);
