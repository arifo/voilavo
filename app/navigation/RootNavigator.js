import { createStackNavigator } from 'react-navigation';

import TabNavigator from './TabNavigator';
import Chat from '../screens/Chat';
import PhoneAuthScreen from '../screens/PhoneAuthScreen';

export default createStackNavigator(
  {
    Main: {
      screen: TabNavigator,
      navigationOptions: {
        header: () => null
      }
    },
    Chat: {
      screen: Chat
    }
  },
  {
    mode: 'modal'
  }
);
