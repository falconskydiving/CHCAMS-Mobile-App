import React, { Component }  from 'react';
import { StyleSheet, View, Dimensions, WebView, TouchableWithoutFeedback, Image } from 'react-native';
import { Platform } from '@unimodules/core';

export default class SiteScreen extends Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'CHCAMS website',
    headerStyle: {
      backgroundColor: '#71a141',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: <TouchableWithoutFeedback onPress={() => {navigation.navigate('Home');}}>
        <View>
                <Image 
                    source = {
                        require('../assets/images/home.png')
                    }
                    style={styles.homeBtn}
                />
        </View>
        </TouchableWithoutFeedback>
  });

  render(){ 
    if(Platform.OS === 'ios'){
      return (
        <View style={styles.container}>
          <WebView useWebKit={true} source={{ uri: "https://chcams.org/" }} scalesPageToFit={true} />
        </View>
      );
    }else{
      return (
        <WebView source={{ uri: "https://chcams.org/" }} automaticallyAdjustContentInsets={false} />        
      );
    }    
  }
}

// SiteScreen.navigationOptions = {
//   title: 'CHCAMS website',
//   headerStyle: {
//     backgroundColor: '#71a141',
//   },
//   headerTintColor: 'white',
//   headerTitleStyle: {
//     fontWeight: 'bold',
//   },
//   headerRight: <TouchableWithoutFeedback onPress={() => {navigation.navigate('Home');}}>
//       <View>
//               <Image 
//                   source = {
//                       require('../assets/images/home.png')
//                   }
//                   style={styles.homeBtn}
//               />
//       </View>
//       </TouchableWithoutFeedback>
// };

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',//Dimensions.get('window').width,
    overflow:'hidden'
  },
  homeBtn:{
    resizeMode: 'contain',
    height: 40,
    width: 68,
  }
});