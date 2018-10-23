import React, { Component } from 'react';
import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import listData from '../../../components/Data/Data';
import { randomArray } from "secure-random";
import uuid from "uuid/v1";

export default class BarCode extends Component {
  state = {
    hasCameraPermission: null,
    hasSuccessfullyScanned: false
  };

  componentDidMount() {
    this._requestCameraPermission();
    //BackAndroid.addEventListener('hardwareBackPress', () => { return(Actions.pop())});
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = ({type, data}) => {
    if (this.state.hasSuccessfullyScanned) return;
    data = JSON.parse(data);
    if (!data.name || !data.price) {
      Alert.alert('Error', 'An error occured. That QR Code doesn\'t seem to be ours, try again.');
      return;
    }
    const newKey = this.generateKey(24);
    console.log('Scan successful!', JSON.stringify(data) + " type: " + type);
    if (!data.key) data.Key = newKey;
    this.setState({hasSuccessfullyScanned: true});
    this.props.handleNewItem(data);
    // this.props.parentList.refreshList(newKey);
  };

  generateKey (length) {
    // const dns = "com.vicki.mart";
    return uuid();
  }

  
  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ? (
          <View style={{flex: 0.45, width: '100%', backgroundColor: 'transparent'}}>
            <Text>Requesting for camera permission</Text>
          </View>
        ) : this.state.hasCameraPermission === false ? (
          <View style={{flex: 0.45, width: '100%', backgroundColor: 'transparent'}}>
            <Text>Camera permission is not granted</Text>
          </View>
        ) : (
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={{ flex: 0.45, width: '100%' }}
          />
        )}
        <View
          style={{flex: 0.55, width: '100%', backgroundColor: '#b6d5e1'}}
        >
          <View style={{margin: 20}}>
            <Card>
              <CardItem header>
                <Body>
                  <Text style={{fontSize: 30, fontWeight: '400'}}>Scanning</Text>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>Point your camera at the bar code or QR Code. Our magic fairies will handle the rest!</Text>
                </Body>
              </CardItem>
            </Card>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
