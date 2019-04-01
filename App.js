import React, {Component} from 'react';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import GetStartScreen from './src/screens/GetStartScreen';
import {ThemeProvider,Text,Icon} from 'react-native-elements';
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';

/* const HomeNavigator = createSwitchNavigator({
  Welcome: WelcomeScreen,
  Practice: PracticeScreen,
  Results: ResultsScreen
}); */

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 10, color: tintColor,textAlign:'center',marginBottom:5 }}>
            Home
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon iconStyle={{ marginTop:5 }} type="font-awesome" name="home" size={horizontal ? 20 : 25} color={tintColor} />
      }
    },
    About: {
      screen: AboutScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 10, color: tintColor,textAlign:'center' ,marginBottom:5}}>
            About
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon iconStyle={{ marginTop:5 }} type="font-awesome" name="list" size={horizontal ? 20 : 25} color={tintColor} />
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 10, color: tintColor,textAlign:'center',marginBottom:5 }}>
            Settings
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon iconStyle={{ marginTop:5 }} type="font-awesome" name="cogs"  size={horizontal ? 20 : 25} color={tintColor} />
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#27ae60',
      inactiveTintColor: 'gray'
    }
  }
);

const InitialNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  App: AppNavigator,
  GetStart: GetStartScreen
});

const AppContainer = createAppContainer(InitialNavigator);
const theme = {
  Text: {
    style : {
      fontFamily : 'Kanit-Regular'
    }
  },
  Button: {
    titleStyle : {
      fontFamily : 'Kanit-Regular'
    }
  },
  Icon : {
    iconStyle : {
      fontFamily : 'Kanit-Regular'
    }
  },
  Header : {
    centerComponent: {
      style :{
        fontFamily : 'Kanit-Bold',        
        fontStyle : 'normal'      
      }
    },
    containerStyle : {
      backgroundColor : '#6cdb9b'
    }
  }
};
class App extends Component {  
  render() {
    return (
      <ThemeProvider theme={theme}>
         <AppContainer/>
      </ThemeProvider>
    )
  }

}

export default App;
