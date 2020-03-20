import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

export default class App extends Component {
  constructor(props) {
    super(props);

    /**
      * Returns true if the screen is in portrait mode
      */
    const isPortrait = () => {
      const dim = Dimensions.get('screen');
      return dim.height >= dim.width;
    };

    this.state = {
        selectedItems: [],
        selectedStates: [],
        selectedCities: [],
        selectedZips: [],

        orientation: isPortrait() ? 'portrait' : 'landscape'
    };

    // Event Listener for orientation changes
    Dimensions.addEventListener('change', () => {
      this.setState({
        orientation: isPortrait() ? 'portrait' : 'landscape'
      });
    });

  }
  _onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
    this.props.setSelection(this.props.locations[selectedItems[0]-1].latlng);
    this.setState({selectedZips: []});
  };

  _onSelectedStatesChange = (selectedStates) => {
    this.setState({ selectedStates });
    this.props.setStateIndexs(this.props.states[selectedStates[0]-1].indexs);
    this.setState({selectedCities: []});
    this.setState({selectedZips: []});
  };
  _onSelectedCitiesChange = (selectedCities) => {
    this.setState({ selectedCities });
    this.props.setCityIndexs(this.props.cities[selectedCities[0]-1].indexs);
    this.setState({selectedStates: []});
    this.setState({selectedZips: []});
  };
  _onSelectedZipsChange = (selectedZips) => {
    this.setState({ selectedZips });
    this.props.setIndexs(this.props.zips[selectedZips[0]-1].indexs);
    this.setState({selectedStates: []});
    this.setState({selectedCities: []});
  };

  render() {
    if (this.state.orientation === 'portrait') {
      return (
        <View style={styles.container}
          // onLayout={(event) => {
          //   var {x, y, width, height} = event.nativeEvent.layout;
          //   Alert.alert("height1", (String)(height)); 
          // }}
        >
          {/* <View style={styles.selectPanel}>
            <SectionedMultiSelect
              single={true}
              items={this.props.locations}
              uniqueKey="index"
              displayKey="name"
              selectText="Choose a clinic name..."
              showDropDowns={false}
              expandDropDowns={false}
              onSelectedItemsChange={this._onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
              searchPlaceholderText="Input a clinic name..."
              
            />
          </View>
          <View style={styles.selectPanel}>
            <SectionedMultiSelect
              single={true}
              items={this.props.locations}
              uniqueKey="index"
              displayKey="display_address"
              selectText="Choose an address..."
              showDropDowns={false}
              expandDropDowns={false}
              onSelectedItemsChange={this._onSelectedItemsChange}
              selectedItems={this.state.selectedItems}
              searchPlaceholderText="Input an address..."
            />
          </View> */}
          <View style={styles.selectPanel}>
            <SectionedMultiSelect
              single={true}
              items={this.props.states}
              uniqueKey="index"
              displayKey="name"
              selectText="Choose a state"
              showDropDowns={false}
              expandDropDowns={false}
              onSelectedItemsChange={this._onSelectedStatesChange}
              selectedItems={this.state.selectedStates}
              searchPlaceholderText="Input a state..."
            />
          </View>
          <View style={styles.selectPanel}>
            <SectionedMultiSelect
              single={true}
              items={this.props.cities}
              uniqueKey="index"
              displayKey="city_full_name"
              selectText="Choose a city"
              showDropDowns={false}
              expandDropDowns={false}
              onSelectedItemsChange={this._onSelectedCitiesChange}
              selectedItems={this.state.selectedCities}
              searchPlaceholderText="Input a city..."
            />
          </View>
          <View style={styles.selectPanel}>
            <SectionedMultiSelect
              single={true}
              items={this.props.zips}
              uniqueKey="index"
              displayKey="zip_code" 
              selectText="Choose a zip"
              showDropDowns={false}
              expandDropDowns={false}
              onSelectedItemsChange={this._onSelectedZipsChange}
              selectedItems={this.state.selectedZips} 
              searchPlaceholderText="Input a zip..."
            />
          </View>
        </View>
      );
    }
    else {
      return (
        <View style={styles.container}
          // onLayout={(event) => {
          //   var {x, y, width, height} = event.nativeEvent.layout;
          //   Alert.alert("height1", (String)(height)); 
          // }}
        >
          <View style={styles.selectPanelLandscape}>
            <SectionedMultiSelect
              single={true}
              items={this.props.states}
              uniqueKey="index"
              displayKey="name"
              selectText="Choose a state"
              showDropDowns={false}
              expandDropDowns={false}
              onSelectedItemsChange={this._onSelectedStatesChange}
              selectedItems={this.state.selectedStates}
              searchPlaceholderText="Input a state..."
            />
          </View>
          <View style={styles.selectPanelLandscape}>
            <SectionedMultiSelect
              single={true}
              items={this.props.cities}
              uniqueKey="index"
              displayKey="city_full_name"
              selectText="Choose a city"
              showDropDowns={false}
              expandDropDowns={false}
              onSelectedItemsChange={this._onSelectedCitiesChange}
              selectedItems={this.state.selectedCities}
              searchPlaceholderText="Input a city..."
            />
          </View>
          <View style={styles.selectPanelLandscape}>
            <SectionedMultiSelect
              single={true}
              items={this.props.zips}
              uniqueKey="index"
              displayKey="zip_code"
              selectText="Choose a zip..."
              showDropDowns={false}
              expandDropDowns={false}
              onSelectedItemsChange={this._onSelectedZipsChange}
              selectedItems={this.state.selectedZips}
              searchPlaceholderText="Input a zip..." 
            />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    zIndex: 3
  },
  selectPanel: {
    height: (Platform.OS === 'ios') ? 65 : ((Dimensions.get('window').width < Dimensions.get('window').height) ?Dimensions.get('window').height / 20 : Dimensions.get('window').width / 20),
    marginTop: (Platform.OS === 'ios') ? -20 : 0,  
  },
  selectPanelLandscape: {
    height: (Platform.OS === 'ios') ? 65 : ((Dimensions.get('window').width > Dimensions.get('window').height) ? (Dimensions.get('window').height / 15) : (Dimensions.get('window').width / 15)),
    marginTop: (Platform.OS === 'ios') ? -30 : 0, 
  }
});