import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, ListView, StatusBar } from 'react-native';
import Login from './src/components/screens/Login';
import Splash from './src/components/screens/splash';
import Scan from './src/components/screens/scan';
import ShopList from './src/components/screens/shopList';
import {createStackNavigator} from 'react-navigation';
import {AppLoading, Asset, Font, Icon } from 'expo';

import NFCscreen from './src/components/NFCscreen';

const AppNavigator = createStackNavigator ({
  Login: { screen: Login },
  ShopList: { screen: ShopList },
  // BarCode: { screen: BarCode },
  Scan: { screen: Scan },
  QRreader: { screen: QRreader },
  NFCscreen: {screen: NFCscreen}
}, {
  initialRouteName: 'Login'
});

export default class App extends Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our icons
        ...Icon.Ionicons.font,
        ...Icon.FontAwesome.font
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
