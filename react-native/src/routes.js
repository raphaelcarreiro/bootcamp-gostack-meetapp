import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
} from 'react-navigation';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/singup/SignUp';
import Meetups from './pages/meetups/Meetups';
import Profile from './pages/profile/Profile';
import Subscriptions from './pages/subscriptions/Subscriptions';

export default isSigned =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Meetups,
            Subscriptions,
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              style: {
                backgroundColor: '#22202c',
                padding: 10,
                height: 64,
              },
              inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
            },
          }
        ),
      },
      { initialRouteName: isSigned ? 'App' : 'Sign' }
    )
  );
