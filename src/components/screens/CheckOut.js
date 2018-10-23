import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Text, Icon, Right } from 'native-base';
//import Icon from 'react-native-vector-icons/Ionicons';

export default class Checkout extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Body>
            <Card>
              <CardItem>
                <Icon active
                 name="md-tag"
                />
                <Text> Checkout with NFC tagging</Text>
                <Right>
                <Icon name="arrow-forward" 
                 onPress={() => this.props.navigation.navigate('NFCscreen')}
                />
              </Right>
              </CardItem>
              <CardItem>
                <Icon active
                 name="md-tag"
                />
                <Text> Checkout by online payment transactions</Text>
                <Right>
                <Icon name="arrow-forward" 
                 onPress={() => this.props.navigation.navigate('Payment')}

                />
              </Right>
              </CardItem>
            </Card>
          </Body>
        </Content>
      </Container>
    )
  }
}
