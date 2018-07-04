import { createMaterialTopTabNavigator } from 'react-navigation';
import React from 'react';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Matches from '../screens/Matches';

export default createMaterialTopTabNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            color={'#df4723'}
            name={focused ? 'ios-person' : 'ios-person-outline'}
            size={40}
          />
        )
      }
    },
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: ' ',
        tabBarIcon: () => (
          <Image
            style={{ width: 25, height: 25 }}
            resizeMode="contain"
            source={require('../assets/voosh-logo.png')}
          />
        )
      }
    },
    Matches: {
      screen: Matches,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Ionicons
            // style={{ marginTop: 70 }}
            color={'#df4723'}
            name={focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline'}
            size={25}
          />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarPosition: 'top',
    initialRouteName: 'Home',
    animationEnabled: true,
    swipeEnabled: false,
    tabBarOptions: {
      style: {
        height: 50
      },
      showLabel: false,
      showIcon: true
    }
  }
);
