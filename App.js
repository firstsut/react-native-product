import React, {Component} from 'react';
import {ScrollView,RefreshControl,View,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {  ThemeProvider,ListItem ,Header,Icon,Button  } from 'react-native-elements';
import Axios from 'axios';
import ContentLoading from './src/components/ContentLoading';
import AppIntroSlider from 'react-native-app-intro-slider';

export default class App extends Component{

  styles = StyleSheet.create({
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
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
      image : require('./resources/images/movie1.png'),
      imageStyle : {
        width: 200,
        height: 200,
      },
      text: 'Welcome movie application in Thailand',       
      backgroundColor : "#1abc9c"
    },
    {
      key: 'start_2',
      title: 'Showtime movies',
      image : require('./resources/images/movie3.png'),
      imageStyle : {
        width: 200,
        height: 200,
      },
      text: 'Showtime movies each theater',          
      backgroundColor : "#34495e"
    }   
  ];
  
  api_url = 'http://showtimes.everyday.in.th/api/v2/theater/';  
  constructor(props){
    super(props);
    this.state = {
        loading : false,
        movies : [],
        showApp : this.getShowRealApp()           
    }
  }
  showMovies(){
    if(!this.state.loading && this.state.movies && this.state.movies.length > 0){      
      return this.state.movies.map((l, i) => (
        <ListItem
          key={i}
          leftAvatar={{ title: l.english[0]}}
          title={l.english}
          chevron
          subtitle={l.thai}
        />
      ));
    }else{
      return <ContentLoading length={10}/>
    }
    
  }

  async getMovies(){
    const response = await Axios.get(this.api_url);
    if(this.state.loading){   
      this.setState({movies: response.data.results, loading: false});
    }
    ``
  }

  async getShowRealApp(){
    try {
      const showRealApp = await AsyncStorage.getItem('@SHOW_REAL_APP');
      console.log('get show '+showRealApp);
      return (showRealApp !== null && showRealApp ? showRealApp : false)          
    } catch (error) {
      return false; 
    }
    
  }

  async clearShowRealApp(){    
    try {
      await AsyncStorage.setItem('@SHOW_REAL_APP', 'N');   
      this.setState({loading: false,showApp : false});         
    } catch (error) {
     
    }
    
  }

  async componentWillMount() {    
    this.setState({loading: true});   
  }
 
  async componentDidMount() {  
    try{
      const flag = await this.getShowRealApp();      
      if(flag == 'Y'){
        await this.getMovies();
      }
    }catch(err){
      console.log(err)
    }    
       
  }

  _onRefresh = () => {
    this.getMovies();
  }

  componentWillUnmount() {  
    this.setState({loading: false});
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
      await AsyncStorage.setItem('@SHOW_REAL_APP', 'Y');
      this.setState({loading: true,showApp : true});
      this._onRefresh();
    }catch(err){
      console.log(err)
    }
  }
  
  render() {  
    if(this.state.showApp){
      return (
        <ThemeProvider>
        <Header            
            backgroundColor="rgba(26, 188, 156,1.0)"        
            centerComponent={{ text: 'Movie Theaters in Thailand', style: { color: '#fff',fontSize:16,fontWeight:"bold" } }}            
          />
          <View style={{flexDirection: 'row',justifyContent:'center'}}>
              <Button
                icon={
                  <Icon
                    name="clear"                    
                    color="black"
                  />
                }                
                iconLeft
                type="outline"
                titleStyle={{color:'black'}}
                containerStyle={{marginTop:10,marginBottom:10}}
                onPress={()=>this.clearShowRealApp()}
                title="Clear Get Start App"
          />   
          </View>
                
          <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this._onRefresh}
                />
              }  
              overScrollMode="always">
              {this.showMovies()}
            </ScrollView >       
      </ThemeProvider>
    )    
    }else{
      return(
        <AppIntroSlider
          slides={this.slides}
          renderDoneButton={this._renderDoneButton}
          renderNextButton={this._renderNextButton}
          onDone={this._onDone}
        />
    )
    }
  }
}
