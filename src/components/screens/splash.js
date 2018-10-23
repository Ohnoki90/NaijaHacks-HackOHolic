import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class Splash extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View
        style={{
          backgroundColor: '#b6d5e1',
          flex: 1,
          alignItems: 'center',
          jsutifyContent: 'center',
        }}>
        <Image
          source={require('../../../assets/logo_transparent.png')}
          style={{ width: 350, height: 350, top: 40 }}
        />
        <Text style={{ fontSize: 30, fontWeight: '400', color: '#555273' }}>Shop with Ease</Text>
      </View>
    );
  }
}
