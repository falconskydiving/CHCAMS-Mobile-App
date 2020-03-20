import React, { Component }  from 'react';
import { StyleSheet, View, Dimensions, WebView } from 'react-native';
import { Platform } from '@unimodules/core';

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      htmlText: "",
    }
  }
  componentWillMount() {
    const { navigation } = this.props;
    let detailContent = ''; 
    if(Platform.OS === 'ios'){
      detailContent= '<h1 style="margin-top:10px;">' + navigation.getParam('param', '').name + '</h1>'; 
    }else{
      detailContent= '<h3 style="margin-top:10px;">' + navigation.getParam('param', '').name + '</h3>'; 
    }
    let count_block = navigation.getParam('param', '').count_block;      
    for(let i = 0; i < count_block; i++)
    {
      detailContent += navigation.getParam('param', '').location_inner_text[i] + "<br/><br/>";
    }
    this.setState({htmlText: detailContent })
  }
  render(){ 
    if(Platform.OS === 'ios'){
      return (
        <View style={styles.container}>
          <WebView useWebKit={true} source={{ html: this.state.htmlText }} scalesPageToFit={true} />
        </View>
      );
    }else{
      return (
        <WebView s source={{ html: this.state.htmlText }} automaticallyAdjustContentInsets={false} />
      );
    }    
  }
}

Profile.navigationOptions = {
  title: 'Profile',
  headerStyle: { 
    backgroundColor: '#71a141',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold', 
  }
};

const styles = StyleSheet.create({
  container: {
    height: '100%', 
    width: Dimensions.get('window').width,
    overflow:'hidden',
  }
});