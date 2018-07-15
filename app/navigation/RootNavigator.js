import { createStackNavigator } from 'react-navigation';

import TabNavigator from './TabNavigator';
import Chat from '../screens/Chat';
import ChatExample from '../screens/chat/ChatExample';
import EditProfile from '../screens/EditProfile';
import Settings from '../screens/Settings';
import example from '../screens/example';
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
      screen: ChatExample,
      navigationOptions: ({ navigation }) => ({
        headerTitle: navigation.state.params.title
      })
    },
    EditProfile: {
      screen: EditProfile
    },
    Settings: {
      screen: Settings
    },
    example: {
      screen: example
    }
  },
  {
    mode: 'modal'
  }
);
