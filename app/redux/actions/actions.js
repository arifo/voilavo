import * as firebase from 'firebase';
import { RNS3 } from 'react-native-aws3';
import { ImagePicker, Location, Permissions, Notifications } from 'expo';
import Geohash from 'latlon-geohash';
import { Alert } from 'react-native';

import {
  LOGIN,
  LOGOUT,
  UPLOAD_IMAGE,
  UPDATE_ABOUTME,
  UPLOAD_SUCCESS,
  TOGGLE_LOADING,
  TOGGLE_BUTTON_LOADING,
  UPDATE_INFO,
  GET_CARDS,
  GET_LOCATION
} from './types';
import awsConfig from '../../config/awsConfig';

export function loginAction(user, value) {
  return dispatch => {
    const params = {
      id: user.uid,
      name: user.displayName,
      aboutMe: ' ',
      birthday: value.birthday,
      city: value.city,
      gender: value.gender,
      images: [value.photoURL],
      chats: ' ',
      geocode: ' ',
      notification: false,
      show: false,
      swipes: {
        [user.uid]: false
      },
      token: ' '
    };

    firebase
      .database()
      .ref('cards/')
      .child(user.uid)
      .once('value', snapshot => {
        if (snapshot.val() !== null) {
          const newSnapshot = snapshot.val().images
            ? snapshot.val()
            : { ...snapshot.val(), images: [] };
          dispatch({ type: LOGIN, user: newSnapshot, loggedIn: true });
          // dispatch(allowNotification());
        } else {
          firebase
            .database()
            .ref(`cards/${user.uid}`)
            .update(params);
          dispatch({ type: LOGIN, user: params, loggedIn: true });
        }
        dispatch({ type: TOGGLE_LOADING, payload: false });
        dispatch({ type: TOGGLE_BUTTON_LOADING, payload: false });
        dispatch(getLocation());
      });
  };
}

export const saveFetchedUserData = tok => ({
  type: UPDATE_INFO,
  payload: tok
});

export const phoneAuthAction = () => dispatch => {
  dispatch({ type: LOGIN, loggedIn: true });
};

export function logoutAction() {
  return dispatch => {
    firebase.auth().signOut();
    dispatch({ type: LOGOUT, loggedIn: false });
  };
}

export function uploadImages(images) {
  return dispatch => {
    ImagePicker.launchImageLibraryAsync({ allowsEditing: false }).then(result => {
      const array = images;

      if (result.uri === undefined) {
        return;
      }

      dispatch({ type: TOGGLE_LOADING, payload: true });

      const file = {
        uri: result.uri,
        name: result.uri,
        type: 'image/png'
      };

      const options = {
        keyPrefix: 'uploads/',
        bucket: 'voilavo',
        region: 'us-east-2',
        accessKey: awsConfig.accessKey,
        secretKey: awsConfig.secretKey,
        successActionStatus: 201
      };

      RNS3.put(file, options).then(response => {
        if (response.status === 201) {
          array.push(response.body.postResponse.location);
          firebase
            .database()
            .ref(`cards/${firebase.auth().currentUser.uid}/images`)
            .set(array)
            .then(() => {
              dispatch({ type: UPLOAD_SUCCESS, payload: true });
              dispatch({ type: UPLOAD_IMAGE, payload: array });
              dispatch({ type: TOGGLE_LOADING, payload: false });
            });
        }
      });
    });
  };
}

export const changeImageIndex = (images, key) => dispatch => {
  const array = images;
  // const imageToUnshift = array.splice(key, 1);
  // array.unshift(...imageToUnshift);
  const swap = (arr, a, b) => ([arr[a], arr[b]] = [arr[b], arr[a]]) && arr;
  const result = swap(array, 0, key);
  dispatch({ type: UPLOAD_IMAGE, payload: result });
  firebase
    .database()
    .ref(`cards/${firebase.auth().currentUser.uid}/images`)
    .set(result);
};

export function deleteImages(images, key) {
  return function (dispatch) {
    Alert.alert(
      'Are sure you want to Delete?',
      '',
      [
        {
          text: 'Ok',
          onPress: () => {
            const array = images;
            array.splice(key, 1);
            dispatch({ type: UPLOAD_IMAGE, payload: array });
            firebase
              .database()
              .ref(`cards/${firebase.auth().currentUser.uid}/images`)
              .set(array);
          }
        },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') }
      ],
      { cancelable: true }
    );
  };
}

export function updateAboutMe(value) {
  return function (dispatch) {
    dispatch({ type: UPDATE_ABOUTME, payload: value });
    setTimeout(() => {
      firebase
        .database()
        .ref(`cards/${firebase.auth().currentUser.uid}`)
        .update({ aboutMe: value });
    }, 3000);
  };
}

export function getCards(geocode) {
  return function (dispatch) {
    firebase
      .database()
      .ref('cards/')
      .orderByChild('geocode')
      .equalTo(geocode)
      .once('value', snap => {
        const items = [];
        snap.forEach(child => {
          const item = child.val();
          item.id = child.key;
          items.push(item);
        });
        dispatch({ type: GET_CARDS, payload: items });
      });
  };
}

export function getLocation() {
  return function (dispatch) {
    Permissions.askAsync(Permissions.LOCATION).then(result => {
      if (result) {
        Location.getCurrentPositionAsync({}).then(location => {
          const geocode = Geohash.encode(location.coords.latitude, location.coords.longitude, 3);
          firebase
            .database()
            .ref(`cards/${firebase.auth().currentUser.uid}`)
            .update({ geocode });
          dispatch({ type: GET_LOCATION, payload: geocode });
        });
      }
    });
  };
}

export const toggleLoading = loading => ({
  type: TOGGLE_LOADING,
  payload: loading
});

export const toggleButtonLoading = loading => ({
  type: TOGGLE_BUTTON_LOADING,
  payload: loading
});
