//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';

// create a component
export default class Footer extends Component {
  render() {
    return (
      <View>
        <Button
          buttonStyle={{
            color: 'white',
            display: 'flex',
            borderWidth: 1,
            borderColor: '#B3B3B3',
            backgroundColor: '#b6d6e1',
            shadowColor: 'rgba(0,0,0,0.1)',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.7,
            shadowRadius: 10,
            borderRadius: 3,
            elevation: 4,
            height: 40,
            marginTop: 28,
            marginLeft: 21,
            marginRight: 21,
          }}
          large
          button
          with
          icon
          icon={{ name: 'shopping-cart', type: 'font-awesome' }}
          title="Checkout"
          onPress={() => {
            Alert.alert(
              'Alert',
              'Checkout??',
              'total cost is #19000',
              [
                {
                  text: 'No',
                  onPress: () => console.log('cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    this.props.navigation.navigate('Checkout');
                  },
                },
              ],
              { cancelable: true }
            );
          }}
        />
      </View>
    );
  }
}
