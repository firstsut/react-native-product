import React, {Component} from 'react';
import {ScrollView,RefreshControl,View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {  ListItem ,Header,Icon,Button  } from 'react-native-elements';
import ContentLoading from '../components/ContentLoading';
import { connect } from 'react-redux';
import { getMovies } from '../actions';

class HomeScreen extends Component{
  static navigationOptions = {
    title: 'Home'
  }; 
  constructor(props){
    super(props);   
    this.state = {
        loading : false                  
    }    
  }

  showMovies(){
    if(!this.state.loading && this.props.movies && this.props.movies.length > 0){      
      return this.props.movies.map((l, i) => (
        <ListItem
          key={i}          
          leftAvatar={{ title: l.english[0]}}
          title={l.english}
          chevron        
          subtitle={l.thai}
        />
      ));
    }else{
      return (
          <ContentLoading length={10}/>
      )
    }    
  }

  async getList(){
    setTimeout(
      function() {
        this.props.getMovies();
        this.stopLoading(); 
      }
      .bind(this),
      200
    );   
  }


  async clearShowRealApp(){    
    try {
      const chk = await AsyncStorage.setItem('@SHOW_REAL_APP', 'N');   
      this.props.navigation.navigate('GetStart');      
    } catch (error) {
     
    }
    
  }

  async startLoading() {          
    this.getList();     
  }

  stopLoading() {       
    this.setState({loading: false});   
  }
 
  async componentDidMount() {  
    this.setState({loading: true});  
    this.startLoading();       
   
  }

  _onRefresh =async () => {    
    this.setState({loading: true});  
    this.startLoading();       
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
                onRefresh={()=>this._onRefresh()}
              />
            }  
            overScrollMode="always">
            {this.showMovies()}
          </ScrollView >
      </View>     
    
     )    
  }
}
const mapStateToProps = ({ movies,movies_content_loading }) => ({
  movies,movies_content_loading
});

const mapDispachToProps = ({ getMovies });
export default connect(mapStateToProps, mapDispachToProps)(HomeScreen);
