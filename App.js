/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Button, ThemeProvider,ListItem  } from 'react-native-elements';
import ContentLoader from 'react-native-content-loader'
import {Circle, Rect} from 'react-native-svg'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
const list = [
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  }
];

export default class App extends Component<Props> {
  render() {
    return (
      
      <ThemeProvider>
        <Button title="Hello World!" />
        <View>
          {
            list.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.name}
                subtitle={l.subtitle}
              />
            ))
          }
        </View>
        <ContentLoader height={300} duration={1000}>
          <Circle cx="30" cy="30" r="30"/>
          <Rect x="75" y="13" rx="4" ry="4" width="100" height="13"/>
          <Rect x="75" y="37" rx="4" ry="4" width="50" height="8"/>
          <Rect x="0" y="70" rx="5" ry="5" width="400" height="200"/>
      </ContentLoader>
      <ContentLoader primaryColor="#e8f7ff"
               secondaryColor="#4dadf7"
               duration={700}
                  height={140}>
        <Rect x="0" y="0" rx="5" ry="5" width="70" height="70"/>
        <Rect x="80" y="17" rx="4" ry="4" width="300" height="13"/>
        <Rect x="80" y="40" rx="3" ry="3" width="250" height="10"/>
        <Rect x="0" y="80" rx="3" ry="3" width="350" height="10"/>
        <Rect x="0" y="100" rx="3" ry="3" width="200" height="10"/>
        <Rect x="0" y="120" rx="3" ry="3" width="360" height="10"/>
    </ContentLoader>
    <ContentLoader
            primaryColor="#fff0f6"
            secondaryColor="#f783ac"
            height={80}>
        <Rect x="0" y="0" rx="3" ry="3" width="70" height="10"/>
        <Rect x="80" y="0" rx="3" ry="3" width="100" height="10"/>
        <Rect x="190" y="0" rx="3" ry="3" width="10" height="10"/>
        <Rect x="15" y="20" rx="3" ry="3" width="130" height="10"/>
        <Rect x="155" y="20" rx="3" ry="3" width="130" height="10"/>
        <Rect x="15" y="40" rx="3" ry="3" width="90" height="10"/>
        <Rect x="115" y="40" rx="3" ry="3" width="60" height="10"/>
        <Rect x="185" y="40" rx="3" ry="3" width="60" height="10"/>
        <Rect x="0" y="60" rx="3" ry="3" width="30" height="10"/>
    </ContentLoader>
      </ThemeProvider>
     
      
    );
  }
}

/* const styles = StyleSheet.create({cd 
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
}); */
