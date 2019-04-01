import React, {Component} from 'react';
import {ScrollView,RefreshControl,View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {  ThemeProvider,ListItem ,Header,Icon,Button  } from 'react-native-elements';
import Axios from 'axios';
import ContentLoading from '../components/ContentLoading';

export default class HomeScreen extends Component{
  static navigationOptions = {
    title: 'Home'
  };
  api_url = 'http://showtimes.everyday.in.th/api/v2/theater/';  
  constructor(props){
    super(props);
    this.state = {
        loading : false,        
        movies : []            
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
  }


  async clearShowRealApp(){    
    try {
      const chk = await AsyncStorage.setItem('@SHOW_REAL_APP', 'N');   
      this.props.navigation.navigate('GetStart');      
    } catch (error) {
     
    }
    
  }

  async componentWillMount() {    
    this.setState({loading: true});   
  }
 
  async componentDidMount() {     
    await this.getMovies();
  }

  _onRefresh = () => {
    this.getMovies();
  }

  componentWillUnmount() {  
    this.setState({loading: false});
  }

 
  
  render() {  
    return (
      
      <View>
        <Header            
            backgroundImageStyle ="linear-gradient(to right top, #051937, #004d7a, #008793, #00bf72, #a8eb12)"        
            centerComponent={{ text: 'Movie Theaters TH', style: { color: '#2c3e50',fontSize:18} }}            
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
      </View>     
    
     )    
  }
}
