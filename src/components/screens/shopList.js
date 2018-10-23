import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
  Dimensions,
} from 'react-native';
import { transparentHeaderStyle } from './navigation';
import Headers from '../../../components/extras/Headers';
import Footers from '../../../components/extras/Footers';
import listData, { Events } from './data';
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label,
  List,
  ListView,
} from 'native-base';
import Swipeout from 'react-native-swipeout';
import { Icon as AllIcons } from 'expo';
const Icon = AllIcons.Ionicons;

import ActionButton from 'react-native-action-button';

let width = Dimensions.get('window').width;

class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRowKey: null,
      count: 1,
      isHover: false,
    };
    this.handlePress = this.handlePress.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
    this._incrementCount = this._incrementCount.bind(this);
    this._reduceCount = this._reduceCount.bind(this);
  }

  handlePress() {
    this.setState({ isHover: true });
  }

  handleIncrement = () => {
    this.setState(s => ({
      count: s.count + 1,
    }));
  };

  _reduceCount() {
    this.setState(s => ({
      count: s.count - 1,
    }));
  }

  handleClose = () => {
    this.setState({
      isHover: false,
    });
    this.setState({ isHover: false });
  };
  _incrementCount() {
    this.setState(s => ({
      count: this.state.count + 1,
    }));
  }

  render() {
    const { isHover, count } = this.state;
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({ activeRowKey: this.props.item.Key });
      },
      right: [
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            Alert.alert(
              'Alert',
              'Are you sure you want to delete ?',
              [
                {
                  text: 'No',
                  onPress: () => console.log('cancelled'),
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  onPress: () => {
                    listData.splice(this.props.index, 1);
                    // this.props.parentList.refreshList(deletingRow);
                    Events.publish('listData/remove', {
                      list: listData,
                      items: [this.props.item],
                    });
                  },
                },
              ],
              { cancelable: true }
            );
          },
          text: 'Delete',
          type: 'delete',
          backgroundColor: 'transparent',
          component: (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundColor: 'transparent',
              }}>
              <Icon
                name="ios-trash-outline"
                size={35}
                style={{ color: '#fff' }}
              />
            </View>
          ),
        },
      ],
      rowId: this.props.index,
      sectionId: 1,
    };

    return (
      <Swipeout {...swipeSettings} style={{ backgroundColor: 'transparent', }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'transparent',
            height: '50%'
          }}>
          <View
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'transparent',
              paddingLeft: 10,
              paddingRight: 10,
              //bottom: 0,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                borderWidth: 2,
                borderRadius: 6,
                marginTop: 10,
                padding: 10,
                borderColor:
                  this.state.activeRowKey === this.props.item.Key
                    ? 'rgba(231,76,60,1)'
                    : 'white',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                width: '100%',
                height: '60%',
                right: 0,
                left: 0,
              }}>
              <Text style={[styles.listItem]}>{this.props.item.name}</Text>
              <Text style={[styles.listItem]}>{this.props.item.price}</Text>
              <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  flexDirection: 'column',
                  left: 200,
                  bottom: 35,
                  
                }}>
                #{this.state.count}
              </Text>
              {count > 1 ? (
                <View style={{flexDirection: 'row', bottom: 100}}>
                  <Icon
                    name="ios-add-circle-outline"
                    size={30}
                    onPress={() => this._incrementCount()}
                    style={{ left: 250,
                    color: 'black' }}
                  />
                  <Icon
                    name="ios-remove-circle-outline"
                    size={30}
                    onPress={() => this._reduceCount()}
                    style={{ left: 120,
                    color: 'black' }}
                  />
                </View>
              ) : (
                <Icon
                  name="ios-add-circle-outline"
                  size={30}
                  onPress={() => this._incrementCount()}
                  style={{ left: 250,color: 'black', bottom: 37 }}
                />
              )}
              </View>
            </View>
          </View>
        </View>
      </Swipeout>
    );
  }
}

export default class ShopList extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: transparentHeaderStyle,
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
      deletedRowKey: null,
      count: 1,
      shownListData: [].concat(listData),
    };
    this._onPressAdd = this._onPressAdd.bind(this);
  }

  componentDidMount() {
    Events.subscribe('listData/push', ({ list, items }) => {
      this.setState(prevState => ({
        shownListData: prevState.shownListData.concat(items),
      }));
      this.refs.list.scrollToEnd();
    });
    Events.subscribe('listData/remove', ({ list, items }) => {
      this.setState(prevState => ({
        shownListData: prevState.shownListData.filter(
          shownItem =>
            !items.some(removedItem => removedItem.Key === shownItem.Key)
        ),
      }));
    });
  }

  refreshList = deletedKey => {
    this.setState(prevState => {
      return {
        deletedRowKey: deletedKey,
      };
    });
    this.refs.list.scrollToEnd();
  };

  _onPressAdd() {
    this.refs.addModal.showAddModal();
  }

  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
        }}>
        <Headers style={{flex: 0.15, marginTop: 38, backgroundColor: '#b6d5e1'}} />
        <ScrollView
         style={{
            display: 'flex',
            paddingTop: 5,
            paddingLeft: 20,
            paddingRight: 20,
            backgroundColor: 'transparent',
            top: 40,
          }}>
          <FlatList
            style={{ backgroundColor: '#b6d5e1' }}
            ref={'list'}
            data={this.state.shownListData}
            renderItem={({ item, index }) => {
              console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
              return <ListItems item={item} index={index} parentList={this} />;
            }}
            keyExtractor={({ Key }) => Key}
          />
        </ScrollView>
        <ActionButton
          style={{ display: 'flex', zIndex: 99 }}
          onPress={() => this.props.navigation.navigate('Scan')}
          buttonColor="rgba(231,76,60,1)"
          renderIcon={() => (
            <Icon
              name="ios-qr-scanner"
              style={[{}, styles.actionButtonIcon]}
              size={25}
              color="#fff"
            />
          )}
        />
        <Footers style={{flex: 0.2, bottom: 5, shadowRadius: 10, elevation: 4, shadowOffset: { width: 0, height: 5 } }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
});
