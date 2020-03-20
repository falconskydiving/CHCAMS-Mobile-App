import React, { Component }  from 'react';
import { StyleSheet, View, Image, Text, TouchableWithoutFeedback, ImageBackground, Dimensions } from 'react-native';
import { Platform } from '@unimodules/core';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      orientation: isPortrait() ? 'portrait' : 'landscape'
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape'
      });
    });
  }
  render(){ 
    if (this.state.orientation === 'portrait') {  
      return (
        <ImageBackground source={ require('../assets/images/home-bg.png')} style={styles.imgBackground}>
        <View style={styles.container}>
          <View style={styles.logoPanel}>
            <Image style={styles.logoImg}
                  source={ require('../assets/images/full-logo.png')}></Image>
          </View>
          <View style={styles.navPanel}>
            <View style={styles.navPanelInside}>
              <TouchableWithoutFeedback  onPress={() => {this.props.navigation.navigate('locationTab');}}>
                <View style={styles.findProviderPanel}>
                  <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:3,}}>
                      <Image style={{width: '100%', height: '100%', resizeMode: 'contain',}}
                        source={ require('../assets/images/ch_hearthand.png')}></Image>
                    </View>
                    <View style={{flex:5, justifyContent:'center', }}>
                      <Text style={styles.navText}>Find your nearest</Text>
                      <Text style={styles.navText}>healthcare provider</Text>
                    </View>
                  </View>
                </View> 
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('siteTab');}}>
                <View style={styles.sitePanel}>              
                  <View style={{flex:1, flexDirection:'row'}}>
                    <View style={{flex:5, }}>  
                      <Image style={{width:'100%', height: '100%', resizeMode: 'contain'}}
                        source={ require('../assets/images/ch_list.png')}></Image>
                    </View>
                    <View style={{flex:11, justifyContent:'center', }}>
                      <Text style={styles.navText}>Visit CHCAM online</Text>
                      <Text style={styles.navText}>http://chcams.org</Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.footerPanel}>
            <View style={{flex:1, flexDirection: 'row',}}>
              <View style={{flex:3, color:'#253832'}}>
                <Text style={styles.footerTitle}>Community Health Center</Text>
                <Text style={styles.footerTitle}>Association of Mississippi</Text>
                <Text style={styles.footerTextMargin}>6400 Lakeover Road, Suite A</Text>
                <Text style={styles.footerText}>Jackson, Mississippi 39213</Text>
                <Text style={styles.footerText}>(601) 981 - 1817</Text>
                <Text style={styles.footerText}>https://chcams.org</Text> 
              </View>
              <View style={styles.footerImgPanel}>
                <Image style={styles.footerImg}
                  source={ require('../assets/images/arrow.png')}></Image>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      );
    }else{
      return (        
        <ImageBackground source={ require('../assets/images/home-bg-landscape.png')} style={styles.imgBackground}>
          <View style={styles.container}>
            <View  style={{height:110, marginLeft: 20, marginRight: 20, }}>
              <View style={styles.headerPanelLdsp}>
                <View style={styles.logoPanelLdsp}>
                  <Image style={styles.logoImg}
                      source={ require('../assets/images/full-logo.png')}></Image>
                </View>
                <View style={{flex:6}}>
                  <View style={{flex:1, flexDirection: 'column',}}>
                    <View style={{flex:8,}}>
                      <TouchableWithoutFeedback  onPress={() => {this.props.navigation.navigate('locationTab');}}>
                        <View style={styles.findProviderPanelLdsp}>
                          <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:3,}}>
                              <Image style={{width: '100%', height: '100%', resizeMode: 'contain',}}
                                source={ require('../assets/images/ch_hearthand.png')}></Image>
                            </View>
                            <View style={{flex:5, justifyContent:'center', }}>
                              <Text style={styles.navText}>Find your nearest</Text>
                              <Text style={styles.navText}>healthcare provider</Text>
                            </View>
                          </View>
                        </View> 
                      </TouchableWithoutFeedback> 
                    </View>
                    <View style={{flex:1}}>
                      
                    </View>
                    <View style={{flex:8}}>
                      <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('siteTab');}}>
                        <View style={styles.sitePanelLdsp}>              
                          <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:5, }}>  
                              <Image style={{width:'100%', height: '100%', resizeMode: 'contain'}}
                                source={ require('../assets/images/ch_list.png')}></Image>
                            </View>
                            <View style={{flex:11, justifyContent:'center', }}>
                              <Text style={styles.navText}>Visit CHCAM online</Text>
                              <Text style={styles.navText}>http://chcams.org</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableWithoutFeedback>
                    </View>
                  </View>
                </View>
                <View style={{flex:3,flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Image style={styles.footerImgLdsp}
                    source={ require('../assets/images/arrow.png')}></Image>
                </View>
              </View>
            </View>
            <View style={{height:70, marginLeft: 20, marginRight: 20,}}>
              <View style={{flex:1, flexDirection:'row',}}>
                <View style={{flex:1, justifyContent:'center', alignItems: "center", right:0}}>
                  <Text style={styles.footerText}>Community Health Center</Text>
                  <Text style={styles.footerText}>Association of Mississippi</Text>
                </View>
                <View style={{flex:1, justifyContent:'center', alignItems: "center",}}>
                  <Text style={styles.footerText}>6400 Lakeover Road, Suite A</Text>
                  <Text style={styles.footerText}>Jackson, Mississippi 39213</Text>
                </View>
                <View style={{flex:1, justifyContent:'center', alignItems: "center",}}>
                  <Text style={styles.footerText}>(601) 981 - 1817</Text>
                  <Text style={styles.footerText}>https://chcams.org</Text> 
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      );
    }    
  }
}

const styles = StyleSheet.create({
  headerPanelLdsp:{
    flex: 1,
    flexDirection: 'row', 
  },
  logoPanelLdsp: {
    flex:7,
    padding:10, height: '100%', backgroundColor: '#509832', marginRight:10,
  },
  findProviderPanelLdsp: {
    height: '100%', width: '100%', backgroundColor: '#b4c03a', paddingTop:5,paddingBottom:5,
  },
  sitePanelLdsp: {
    height: '100%', width: '100%', backgroundColor: '#b4c03a', paddingTop:5,paddingBottom:5,
  },
  footerImgLdsp: {
    width:110, height:110, resizeMode: 'contain', right:0
  },







  imgBackground: {
    width:null, 
    height:null,
     flex:1
  },
  container: {
    flex: 1,
    flexDirection: 'column', 
    justifyContent: 'flex-end',
  },
  logoPanel:{
    padding:10, marginLeft: 20, marginRight: 20, height: 150, backgroundColor: '#509832',
  },
  logoImg:{
    width: '100%', height: '100%', resizeMode: 'contain',
  },
  navPanel:{
    marginLeft: 20, marginRight: 20, height:60,marginTop:10,
  },
  navPanelInside:{
    flex:1, flexDirection: 'row', justifyContent: 'space-between',
  },
  findProviderPanel:{
    width:'48%', backgroundColor: '#b4c03a', paddingTop:5,paddingBottom:5,
  },
  sitePanel: {
    marginLeft:'4%', width:'48%', backgroundColor: '#b4c03a', paddingTop:5,paddingBottom:5,
  },
  navText:{
    fontSize: 12, color: 'white'
  },
  footerPanel: {
    height:170, marginLeft: 20, marginRight: 20,marginTop:20
  },
  footerImgPanel: {
    flex:2, flexDirection: 'row', justifyContent: 'flex-end' 
  },
  footerImg: {
    width:130, height: 130, resizeMode: 'contain', right:0
  },
  footerTitle: {
    color:'#044a3a', fontSize: 15,
  },
  footerText: {
    color:'#044a3a', fontSize: 12
  },
  footerTextMargin: {
    color:'#044a3a', fontSize: 12, marginTop:7
  }
});