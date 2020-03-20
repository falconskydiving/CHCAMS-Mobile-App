import { createAppContainer,createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import MainTabNavigator from './MainTabNavigator';
import ProfileScreen from '../screens/Profile';
import HeaderHomeBtn from '../components/HeaderHome';

// const AppNavigator = createStackNavigator({clockInOut: ClockInOut, home: Home});

export default createAppContainer(
  createStackNavigator({
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          header: null,
        }
      },
      Main : {
        screen: MainTabNavigator,
        navigationOptions: {
          header: null,
        }
      },
      Profile: ProfileScreen,
      HeaderHome: HeaderHomeBtn,
    },
  )
);