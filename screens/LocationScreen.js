import React, {useState } from 'react';
import { Image, StyleSheet, Text,Button, View, SafeAreaView, Dimensions, Platform, Alert, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import HeaderLogo from '../components/HeaderLogo';
import HeaderHome from '../components/HeaderHome';

import ClinicalMap from '../components/Map.js';
import ClinicalLocations from '../components/ClinicalLocations.js';
var test;
export default class LocationScreen extends React.Component {
 
  constructor(props) {
    super(props);
    test = this.props.navigation;
    /**
      * Returns true if the screen is in portrait mode
      */
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      clinicalLocations : [],
      states: [],
      cities: [],
      zips: [],
      region: {
        latitude: 32.3104541,
        longitude: -90.2638272, 
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      orientation: isPortrait() ? 'portrait' : 'landscape',
  
    };

    this.getSelection = this.getSelection.bind(this);
    // this.getStateIndexs = this.getStateIndexs.bind(this);  
    this.getIndexs = this.getIndexs.bind(this);  

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape'
      });
    });
  
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerStyle: {
      backgroundColor: '#71a141',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerLeft: <HeaderLogo/>,

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

  componentWillMount() {
    this.getClinicalLocations();
  }

  componentDidMount() {
    this.setState({
      region: {
        latitude: 32.3104541,
        longitude: -90.2638272, 
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    });
  }
  getClinicalLocations = async () =>  {
    let response = await fetch(`https://chcams.org/wp-json/clinical-locations/v1/retrieve`);
    let resources_json = await response.json();
    this.setState({ clinicalLocations: resources_json });

    console.log("clinicalLocations============================>" + JSON.stringify(resources_json));

    let state_arr = [];
    state_arr.push({'index':1, 'code': 'MS', 'name': 'MISSISSIPPI', 'indexs':[]});
    state_arr.push({'index':2, 'code': 'ALA', 'name': 'ALABAMA', 'indexs':[]});

    let city_arr = [];
    let zip_arr = [];
    let index_city = 1;
    let index_zip = 1;

    for(let i=0;i<resources_json.length;i++)
    {
      if(resources_json[i].state_code == 'MS'){
        state_arr[0].indexs.push(resources_json[i].index);
      }else{
        state_arr[1].indexs.push(resources_json[i].index);
      }

      let is_dupliated_city = 0;
      if(city_arr.length > 0 ){
        for(let k=0;k<city_arr.length;k++){
          if((city_arr[k].city_name == resources_json[i].city) && (city_arr[k].state_code == resources_json[i].state_code)){
            city_arr[k].indexs.push(resources_json[i].index);
            is_dupliated_city++;
          }
        }
      }
      if(is_dupliated_city == 0){
        city_arr.push({'index':index_city, 'state_code': resources_json[i].state_code, 'city_name': resources_json[i].city, 'city_full_name': resources_json[i].city+' ('+resources_json[i].state_code + ')', 'indexs': [resources_json[i].index]});
        index_city++;
      }


      let is_dupliated_zip = 0;
      if(zip_arr.length > 0 ){
        for(let k=0;k<zip_arr.length;k++){
          if(zip_arr[k].zip_code == resources_json[i].zip_code){
            zip_arr[k].indexs.push(resources_json[i].index);
            is_dupliated_zip++;
          }
        }
      }

      if(is_dupliated_zip == 0){
        zip_arr.push({'index':index_zip, 'zip_code': resources_json[i].zip_code, 'indexs': [resources_json[i].index]});
        index_zip++;
      }
    }

    this.setState({ 
      states: state_arr,
      cities: city_arr,
      zips: zip_arr
    });

  }

  getSelection(res) {
    this.setState({ region: res });
  }

  getIndexs(res){
    if(res.length > 0 ){
      if(res.length >1){
        this.clinicalMap._onFitMarkers(res);
      }else{
        this.setState({ region: this.state.clinicalLocations[res[0]-1].latlng });
      }
    }else{
      setTimeout(() => {
        Alert.alert('Note', 'There is no provider!');
      }, 600);
      
    }
  }

  render(){
    if (this.state.orientation === 'portrait') {
      return (
          <SafeAreaView style={styles.safeView}>
            <View style={styles.container}>
              <View>
                <Image style={styles.headerImage}
                  source={ require('../assets/images/header.png')}></Image>
              </View>
              
              <Text style={styles.getStartedText}>Find your nearest healthcare provider</Text>
              <View style={styles.clinicalPanel}>
                <ClinicalLocations locations={this.state.clinicalLocations} states={this.state.states} cities={this.state.cities} zips={this.state.zips} setSelection={this.getSelection} setStateIndexs={this.getIndexs} setCityIndexs={this.getIndexs} setIndexs={this.getIndexs} />
              </View>
              <ClinicalMap navigation={this.props.navigation} locations={this.state.clinicalLocations} region={this.state.region} ref={map => {this.clinicalMap = map}}/>
            </View>
          </SafeAreaView>
       );
    }
    else {
      return (
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 3, backgroundColor: 'white'}}>
            <View>
              <Image style={styles.headerImageLandscape}
                source={ require('../assets/images/header.png')}></Image>
            </View>
            
            <Text style={styles.getStartedTextLandscape}>Find your nearest healthcare provider</Text>
            <View style={styles.clinicalPanelLandscape}>
              <ClinicalLocations locations={this.state.clinicalLocations} states={this.state.states} cities={this.state.cities} zips={this.state.zips} setSelection={this.getSelection} setStateIndexs={this.getIndexs} setCityIndexs={this.getIndexs} setIndexs={this.getIndexs} />
            </View>
          </View>
          <View style={{flex:4, backgroundColor: 'skyblue'}}>
            <ClinicalMap navigation={this.props.navigation} locations={this.state.clinicalLocations} region={this.state.region} ref={map => {this.clinicalMap = map}}/>
          </View>
        </View>
      );
    }
  } 
}

// LocationScreen.navigationOptions = {
//   headerStyle: {
//     backgroundColor: '#71a141',
//   },
//   headerTintColor: 'white',
//   headerTitleStyle: {
//     fontWeight: 'bold',
//   },
//   headerLeft: <HeaderLogo/>,
//   // headerRight: <HeaderHome/>,
//   headerRight: <HeaderHome navigation={test}/>,
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerImage: {
    resizeMode: 'cover',
    width: '100%', //(Dimensions.get('window').width < Dimensions.get('window').height)? Dimensions.get('window').width : Dimensions.get('window').height,
    height: (Dimensions.get('window').width < Dimensions.get('window').height)? Dimensions.get('window').width * 5 /12 : Dimensions.get('window').height * 5 /12,
  },
  clinicalPanel:{
    marginTop: Dimensions.get('window').height / 30,
    height: (Dimensions.get('window').width < Dimensions.get('window').height)? Dimensions.get('window').height / 6: Dimensions.get('window').width / 6,
  },
  getStartedText: {
    fontSize: 24,
    color: '#e86028',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  getStartedTextLandscape:{
    fontSize: 18,
    color: '#e86028',
    lineHeight: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  safeView: {
    flex: 1,
    backgroundColor: '#2e78b7',
  },

  headerImageLandscape: {
    resizeMode: 'cover',
    width: '100%',//(Dimensions.get('window').width > Dimensions.get('window').height) ? Dimensions.get('window').width*3/7 : Dimensions.get('window').height*3/7,
    height: (Dimensions.get('window').width > Dimensions.get('window').height) ? Dimensions.get('window').width*15/84 :Dimensions.get('window').height*15/84,
  },
  clinicalPanelLandscape: {
    marginTop: (Platform.OS === 'ios') ? 30 : -10,
    height: (Dimensions.get('window').width > Dimensions.get('window').height) ? Dimensions.get('window').height / 2 : Dimensions.get('window').width / 2,
  },

  homeBtn:{
    resizeMode: 'contain',
    height: 40,
    width: 68,
  }
});