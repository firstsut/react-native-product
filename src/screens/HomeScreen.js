import React, {Component} from 'react';
import {ScrollView,RefreshControl,View,StyleSheet,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {  ListItem ,Header,Icon,Button,Image,Rating } from 'react-native-elements';
import ContentLoading from '../components/ContentLoading';
import { connect } from 'react-redux';
import { getMovies } from '../actions';
import * as Animatable from 'react-native-animatable';

class HomeScreen extends Component{
  static navigationOptions = ({ navigation }) => {
    return {
      header : null     
    };
  };
  constructor(props){
    super(props);   
    this.state = {
        loading : false                  
    }    
  }

  
  showMovies(){
    if(!this.state.loading && this.props.movies && this.props.movies.length > 0){    
      const { navigation } = this.props;  
      return this.props.movies.map((l, i) => (
        
        <ListItem
          key={i}          
          leftAvatar={{ title: l.english[0]}}
          title={l.english}
          chevron  
          titleStyle={{fontSize:14}} 
          subtitleStyle={{fontSize:10}}          
          onPress={() => navigation.navigate('HomeDetail',{title:l.thai,theater_id:l.id})}
          bottomDivider={true}  
          subtitle={l.thai}    
          rightTitle={<Rating  
            readonly={true}                        
            type='star'
            imageSize={14}           
            startingValue={l.stars && l.stars > 5?5 : l.stars}                    
          />}          
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
      const chk = await AsyncStorage.setItem('@SHOW_REAL_APP', 'N',(err)=>{
        if(!err) this.props.navigation.navigate('GetStart');   
      });         
        
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
      
        <View style={{flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 1}}>
        <Header         
            centerComponent={<Animatable.Image animation="zoomIn" delay={200} source={require('../../resources/images/movie2.png')}
            style={{ width: 65, height: 65 }}/>}    
            containerStyle={{paddingBottom:30,paddingTop:30}}        
        />
       
        
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
       </View>
     )    
  }
}
const mapStateToProps = ({ movies }) => ({
  movies
});

const mapDispachToProps = ({ getMovies });
export default connect(mapStateToProps, mapDispachToProps)(HomeScreen);
