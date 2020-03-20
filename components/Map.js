import React from 'react';
import MapView, { Marker, Callout} from 'react-native-maps';
import { StyleSheet, View, Text, Dimensions} from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    
    /**
      * Returns true if the screen is in portrait mode
      */
     const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
      isMapReady : false,
      beforeRegion:{},

      orientation: isPortrait() ? 'portrait' : 'landscape'
    }
    this.mapRef = null;

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape'
      });
    });
  }

  componentWillMount() {
    this.setState({beforeRegion: {latitude: this.props.region.latitude, longitude: this.props.region.longitude}});
  }

  _onPressBtnMore(locationDetail) {
    this.props.navigation.navigate('Profile', {param: locationDetail});
  }

  _onFitMarkers(markerIndexs){
    let markerIDs = [];
    markerIndexs.map(index =>(
      markerIDs.push("Marker"+(String)(index))
    ));
    this.mapRef.fitToSuppliedMarkers(
      markerIDs,
      {
        edgePadding: 
        {
          top: 30,
          right: 30,
          bottom: 30,
          left: 30}
        }
    );
  }

  render() {
    if (this.state.orientation === 'portrait') {
      return (
        <View style={styles.container}> 
          <View style={styles.inner_container}>
            <MapView
              ref={ref => { this.mapRef = ref; }}
              style={styles.mapStyle}
              region={this.props.region}
              minZoomLevel={5}  // default => 0
              maxZoomLevel={18} // default => 20
            >
              {this.props.locations.map(location => (
              <Marker
                key={ Math.floor(Math.random() * 100000) + 1 }
                coordinate={location.latlng}
                onCalloutPress={() => this._onPressBtnMore(location)}
                identifier={'Marker'+location.index}
              >
                <Callout>
                  <View style={styles.calloutPanel}>
                    <View>
                        <Text style={styles.calloutTitle}>
                          {location.name}
                        </Text>
                    </View>
                    <View >
                      <Text style={styles.calloutContent}>
                        {location.address1} 
                      </Text>
                      <Text style={styles.calloutContent}>
                        {location.address2}
                      </Text>
                      <Text style={styles.calloutContent}>
                        Phone: {location.phone}
                      </Text>
                    </View> 
                    <View style={styles.btnProfileLabel}>
                      <Text >More...</Text>
                    </View>
                  </View>
                </Callout>
              </Marker> 
              ))}
            </MapView>
          </View> 
        </View>
      );
    }else{
      return (
        <View style={styles.containerLandscape}> 
          <View style={styles.inner_container}>
            <MapView
              ref={ref => { this.mapRef = ref; }}
              style={styles.mapStyle}
              region={this.props.region}
              minZoomLevel={5}  // default => 0
              maxZoomLevel={18} // default => 20
            >
              {this.props.locations.map(location => (
              <Marker
                key={ Math.floor(Math.random() * 100000) + 1 }
                coordinate={location.latlng}
                onCalloutPress={() => this._onPressBtnMore(location)}
                identifier={'Marker'+location.index}
              >
                <Callout>
                  <View style={styles.calloutPanel}>
                    <View>
                        <Text style={styles.calloutTitle}>
                          {location.name}
                        </Text>
                    </View>
                    <View >
                      <Text style={styles.calloutContent}>
                        {location.address1}{location.address2}
                      </Text>
                      <Text style={styles.calloutContent}>
                        Phone: {location.phone}
                      </Text>
                    </View> 
                    <View style={styles.btnProfileLabel}>
                      <Text >More...</Text>
                    </View>
                  </View>
                </Callout>
              </Marker>
              ))}
            </MapView>
          </View> 
        </View>
      );
    }
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    zIndex:5
  },
  containerLandscape: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    zIndex:5
  },
  inner_container: {
    borderWidth: 2, 
    borderColor:'#e6e5e4', 
    borderRadius: 2, 
    width: '100%',
    height: '100%',    
  },
  mapStyle: {
    width: '100%',
    height: '100%',
  },
  btnProfileLabel: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#21ba45',
    borderRadius: 5,
    height: 20,
    marginTop:2,
  },
  calloutPanel: {
    width: 250,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 13,
  },
  calloutContent: {
    marginTop:2, fontSize: 13,
  }
});