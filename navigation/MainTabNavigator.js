import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LocationScreen from '../screens/LocationScreen';
import SiteScreen from '../screens/SiteScreen';


const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const LocationStack = createStackNavigator(
  {
    Location: LocationScreen,
  },
  config
);
LocationStack.navigationOptions = {
  tabBarLabel: 'Locations',
  header:null ,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};
LocationStack.path = '';

const SiteStack = createStackNavigator(
  {
    
    Site: SiteScreen,
  },
  config
);
SiteStack.navigationOptions = {
  tabBarLabel: 'CHCAMS website',
  header:null ,
  tabBarIcon: ({ focused }) => {
    // <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
    const image = focused
    ? require('../assets/images/WebsiteActive.png')
    : require('../assets/images/WebsiteInactive.png')
    return (
        <Image
            source={image}
            style={{height:20, width:24}}
        />
    )
  }
};
SiteStack.path = '';

const tabNavigator = createBottomTabNavigator({
    locationTab: LocationStack,
    siteTab: SiteStack,
  },{
    tabBarOptions: {
      tabBarVisible: true,
      animationEnabled: true,
      showLabel: true,
      marginBottom: 5,
    }, 
  }
);

tabNavigator.path = '';  
export default tabNavigator;