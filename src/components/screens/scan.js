import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
// import { Constants, BarCodeScanner, Permissions } from 'expo';
import BarCodeScan from './BarCodeScan';
import listData, { Events } from '../components/data/data';
import transparentHeaderStyle from '../styles/navigation';
import BackButton from '../components/buttons/BackButton';

export default class Scan extends Component {
  static navigationOptions = ({ navigation }) => ({
    //headerLeft: <BackButton location="left" color="white" text="Shop List" handleButtonPress={() => navigation.navigate('ShopList')}/>,
    headerStyle: transparentHeaderStyle,
    //header: navigation.navigate('goBack'),
    title: 'Scan Code', //navigation.getParam('name', 'Shoplist')
  });
  handleNewItem = (newItem) => {
    // TODO: Handle the new item
    listData.push(newItem);
    Events.publish('listData/push', {
      list: listData,
      items: [newItem]
    })
    this.props.navigation.navigate('ShopList');
  }
  render () {
    return (
      <BarCodeScan
        handleNewItem={this.handleNewItem}
      />
    )
  }
}