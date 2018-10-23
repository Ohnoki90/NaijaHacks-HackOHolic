import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { Icon as AllIcons } from 'expo';
const Icon = AllIcons.Ionicons;

export default class Headers extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Icon
            name="ios-list"
            size={30}
            color={'#919191'}
            style={styles.listIcon}
          />
          <Text style={styles.headerText}>Shopping List</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 99,
    height: '80%',
    width: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  headerContainer: {
    dislay: 'flex',
    borderWidth: 1,
    borderColor: '#B3B3B3',
    backgroundColor: '#ffff',
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    borderRadius: 4,
    height: 40,
    marginTop: 28,
    marginLeft: 21,
    marginRight: 21,
  },
  listIcon: {
    position: 'absolute',
    left: 19,
    top: 8,
    bottom: 5,
  },
  headerText: {
    display: 'flex',
    color: '#919191',
    marginTop: 12,
    marginLeft: 45,
  },
});
