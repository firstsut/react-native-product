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
import * as Animatable from 'react-native-animatable';

const HomeNavigator = createStackNavigator({
  Home: HomeScreen,
  HomeDetail: HomeDetailScreen
});  

const AppNavigator = createBottomTabNavigator(
  {
    About: {
      screen: AboutScreen,
     
    },

    Home: {
      screen: HomeNavigator,
     
    },
    
    Settings: {
      screen: SettingsScreen,     
    }   
  },
  {    
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarLabel: ({ focused,tintColor }) => {
        const { routeName } = navigation.state;  
        return (
          <Text style={{ fontSize: 10, color: tintColor,textAlign:'center',marginBottom:5 }}>
            {focused ? '' : routeName}
          </Text>
        )
      },
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;       
        let iconName;
        if (routeName === 'Home') {
          iconName = `home`;      
        } else if (routeName === 'Settings') {
          iconName = `settings`;
        }else if (routeName === 'About') {
          iconName = `list`;
        }

        // You can return any component that you like here!
        if(routeName == 'Home'){
          return <Animatable.View animation="zoomIn" delay={200}><Icon iconStyle={{ marginTop:5}} type="material"  reverse={focused} reverseColor="#34495e"  raised={focused} name={iconName} size={horizontal ? 20 : 30} color={tintColor} /></Animatable.View>;
        }
        return <Icon iconStyle={{ marginTop:5}} type="material"  reverse={focused} reverseColor="#34495e"  raised={focused} name={iconName} size={horizontal ? 20 : 30} color={tintColor} />;
      },
    }),  
    initialRouteName : 'Home',
    tabBarOptions: {
      activeTintColor: '#e5e5e5',
      inactiveTintColor: '#ffffff',
      style : {
        //borderTopColor : 'rgba(52, 73, 94,1.0)',
        //borderTopWidth: 8,      
        marginTop:0,
        backgroundColor : 'rgba(52, 73, 94,1)',
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
      backgroundColor : '#34495e',
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
