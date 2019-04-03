import React, {Component} from 'react';
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import GetStartScreen from './src/screens/GetStartScreen';
import HomeDetailScreen  from './src/screens/HomeDetailScreen';
import {ThemeProvider,Text,Icon} from 'react-native-elements';
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reducers from './src/reducers';
import reduxThunk from 'redux-thunk';

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
  HomeDetail: HomeDetailScreen
});  

const AppNavigator = createBottomTabNavigator(
  {
    About: {
      screen: AboutScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 10, color: tintColor,textAlign:'center' ,marginBottom:5}}>
            About
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon iconStyle={{ marginTop:5 }} type="material"  raised={false} name="list" size={horizontal ? 20 : 25} color={tintColor} />
      }
    },

    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        tabBarLabel: ({ tintColor }) => (
          <Text style={{ fontSize: 10, color: tintColor,textAlign:'center',marginBottom:5 }}>
            
          </Text>
        ),
        tabBarIcon: ({ horizontal, tintColor }) =>
          <Icon iconStyle={{ marginTop:5 }} type="material"  reverse={true}  raised={true} name="home" size={horizontal ? 20 : 30} color={tintColor} />
        ,  
       
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
          <Icon iconStyle={{ marginTop:5 }} type="material"  raised={false} name="settings"  size={horizontal ? 20 : 25} color={tintColor} />
      }
    }   
  },
  {    
    initialRouteName : 'Home',
    tabBarOptions: {
      activeTintColor: '#27ae60',
      inactiveTintColor: 'gray',
      style : {
        borderTopColor : '#27ae60',
        borderTopWidth: 2,      
        marginTop:1,
        backgroundColor : '#fff',
      }
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
      backgroundColor : 'rgba(46, 204, 113,.8)',
    }
  },
  Badge : {
    textStyle: {
      fontFamily : 'Kanit-Regular'
    }
  }
};
class App extends Component {  
  render() {
    return (
      <Provider store={createStore(reducers,{},applyMiddleware(reduxThunk))}>
        <ThemeProvider  theme={theme}>
          <AppContainer/>
        </ThemeProvider>
      </Provider>
    )
  }

}

export default App;
