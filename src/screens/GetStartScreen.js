import React, {Component} from 'react';
import {View,StyleSheet,StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Icon ,Text,Image} from 'react-native-elements';
import AppIntroSlider from 'react-native-app-intro-slider';
import * as Animatable from 'react-native-animatable';

export default class GetStartScreen extends Component{  
  styles = StyleSheet.create({
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center'
      
    },
    image: {
      width: 320,
      height: 320,
    }
  });
  
  slides = [
    {
      key: 'start_1',
      title: 'Movie Theaters in Thailand',
      image : require('../../resources/images/movie1.png'),
      imageStyle : {
        width: 200,
        height: 200,
      },
      textStyle : {
        fontFamily : 'Kanit-Light',
        color:'white',
        fontSize:20
      },
      titleStyle : {
        fontFamily : 'Kanit-Light',
        color:'white',
        fontSize:14,
        marginBottom:30
      },
      text: 'Welcome movie application in Thailand',       
      backgroundColor : "#1abc9c"
    },
    {
      key: 'start_2',
      title: 'Showtime movies',
      image : require('../../resources/images/movie3.png'),
      imageStyle : {
        width: 200,
        height: 200,
      },
      textStyle : {
        fontFamily : 'Kanit-Light',
        color:'white',
        fontSize:20
      },
      titleStyle : {
        fontFamily : 'Kanit-Light',
        color:'white',
        fontSize:14,
        marginBottom:30
      },
      text: 'Showtime movies each theater',          
      backgroundColor : "#34495e",     
    }   
  ];
  

  async componentWillMount() {    
    this.setState({loading: true});   
  }
 

  _renderNextButton = () => {    
    return (
      <View style={this.styles.buttonCircle}>
        <Icon
          type="ionicon"
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={this.styles.buttonCircle}>
        <Icon
         type="ionicon"
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }

  _onDone = async () => {  
    try{
      const chk = await AsyncStorage.setItem('@SHOW_REAL_APP', 'Y');   
      this.props.navigation.navigate('App'); 
    }catch(err){
      console.log(err)
    }
  }

  _renderItem = (item) => {
 
    return (
      <View style={{backgroundColor:item.backgroundColor,flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',}}>
        <StatusBar backgroundColor="#1abc9c" barStyle="light-content" />
        <Text style={item.textStyle}>{item.title}</Text>
        <Animatable.Image iterationCount="infinite"  duration={2000} animation="pulse" style={{ width: 250, height: 250 }} source={item.image} />
        <Text style={item.titleStyle}>{item.text}</Text>
      </View>
    );
  }

  _slideChange = (index,lastIndex)=>{
    StatusBar.setBackgroundColor(this.slides[index].backgroundColor)
  }
  
  
  render() {  
    return(
        <AppIntroSlider
          renderItem={this._renderItem}
          slides={this.slides}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          onDone={this._onDone}
          onSlideChange={this._slideChange}
        />
    )
  }
}
