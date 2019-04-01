import React from 'react';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
class SplashScreen extends React.Component {

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        3000
      )
    )
  }

  async getShowApp(){
    try {
      const showRealApp = await AsyncStorage.getItem('@SHOW_REAL_APP');    
      return (showRealApp !== null && showRealApp == 'Y' ? true : false)          
    } catch (error) {
      return false; 
    }
    
  }

  async componentDidMount() {

    

    const data = await this.performTimeConsumingTask();
    const showApp = await this.getShowApp();
    if (data !== null) {
      
      if(showApp){
        this.props.navigation.navigate('App');
      
      }else{
        this.props.navigation.navigate('GetStart');
      }
      
    }
  }

  render() {
    return (
      <LinearGradient colors={['#57d68d', '#6cdb9b','#29b765']} style={styles.linearGradient}>
        <Animatable.Image
            animation="zoomInUp"
            source={require('../../resources/images/movie2.png')}
            style={{ width: 200, height: 200 }}
          />
      </LinearGradient>     
    );
  }
}

const styles = {
  linearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',    
  },
  
}

export default SplashScreen;