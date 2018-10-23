//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, } from 'react-native';

// create a component
export default class QRreader extends Component {
  constructor(props) {
    super(props);
  }

  
_requestCameraPermission = (permission) => {
  Permissions.request(permission).then(response => {
    this.setState({ cameraPermission: response })
  })
}

_requestPermission = permission => {
  var options
  if (permission == 'location') {
        options = this.state.isAlways ? 'always' : 'whenInUse'
  }
  Permissions.request(permission, options)
        .then(res => { this.setState({ status: { ...this.state.status, [permission]: res },
          })
          if (res != 'authorized') {
            var buttons = [{ text: 'Cancel', style: 'cancel' }]
            if (this.state.canOpenSettings)
              buttons.push({
  text: 'Open Settings', 
  onPress: this._openSettings,
              })
  Alert.alert( 'Whoops!','There was a problem getting your permission. Please enable it from settings.',buttons,)
          }
        })
        .catch(e => console.warn(e))
    }

onSuccess(e) {
  Linking
    .openURL(e.data)
    .catch(err => console.error('An error occured', err));
}
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
         style={[styles.button, styles[this.state.status[camera]]]}
         key={camera}
         onPress={() => this._requestCameraPermission(camera)}
        >
          <View>
            <Text style={styles.subtext}>{this.state.status[camera]}</Text>
          </View>
        </TouchableHighlight>
        <QRCodeScanner
          onRead={this.onSuccess.bind(this)}
          topContent={
            <Text style={styles.centerText}>
              scan the QR code.
            </Text>
          }
          bottomContent={
            <TouchableOpacity style={styles.buttonTouchable}>
              <Text style={styles.buttonText}>OK. Got it!</Text>
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}


// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  centerText: {
    flex: 1,
    fontSize: 16,
    padding: 32,
    color: '#967ADC',
    fontWeight: '200',
  },
});

//AppRegistry.registerComponent('default', () => ScanScreen);