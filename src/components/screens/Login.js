import React, { Component } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  StatusBar,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import * as Firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: WIDTH } = Dimensions.get('window');
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValid: true,
      validEmail: false,
      password: '',
      emailAddress: '',
      validPassword: false,
      oadingVisible: false,
    };
  }
  render() {
    return (
      <KeyboardAvoidingView
       behaviour= "padding"
        style={[
          {
            flex: 1,
            backgroundColor: 'white',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
          },
          styles.container,
        ]}>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <View style={styles.container}>
            <Image
              style={{ width: 180, height: 120 }}
              source={require('../../../mainAssets/logo_transparent.png')}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: '#3934e6',
              opacity: 0.9,
              marginTop: 5,
            }}>
            Welcome back,
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 300,
              color: '#b9babd',
              opacity: 0.9,
              marginTop: 5,
            }}>
            sign in to continue
          </Text>
          <View style={styles.inputContainer}>
            <Icon name="md-mail" size={28} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              placeholderTextColor="#b9babd"
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="md-key" size={28} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCorrect={false}
              keyboardType="password"
              returnKeyType="go"
              secureTextEntry={true}
              placeholderTextColor="#b9babd"
            />
          </View>
          <TouchableOpacity style={{marginTop: 20,}}>
            <Text> Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH - 55,
    height: 50,
    borderRadius: 20,
    fontSize: 18,
    paddingLeft: 45,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.1)',
    left: 7,
  },
  container: {
    marginBottom: 30,
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    top: 19,
    left: 37,
    right: 0,
  },
  inputContainer: {
    paddingTop: 10,
    
  },
});
