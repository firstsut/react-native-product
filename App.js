/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,ScrollView} from 'react-native';
import {  ThemeProvider,ListItem ,Header } from 'react-native-elements';
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
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  
 
];

export default class App extends Component<Props> {
  render() {
    return (
      
      <ThemeProvider>
        <Header
            leftComponent={{ icon: 'menu', color: '#fff' }}
            centerComponent={{ text: 'React Product', style: { color: '#fff' } }}
            rightComponent={{ icon: 'home', color: '#fff' }}
          />
        <ScrollView overScrollMode="always">
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
        </ScrollView >

        <ContentLoader   height={300} width={400} duration={1000}>
          <Circle cx="40" cy="40" r="30"/>
          <Rect x="75" y="23" rx="4" ry="4" width="100" height="13"/>
          <Rect x="75" y="47" rx="4" ry="4" width="50" height="8"/>
          <Rect x="10" y="80" rx="5" ry="5" width="390" height="200"/>
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
