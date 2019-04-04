import React, {Component} from 'react';
import {ScrollView,RefreshControl,View,TouchableOpacity,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {  ListItem ,Header,Icon,Button,Rating,Text } from 'react-native-elements';
import ContentLoading from '../components/ContentLoading';
import { connect } from 'react-redux';
import { getMovies } from '../actions';
import LinearGradient from 'react-native-linear-gradient';

class HomeScreen extends Component{
  static navigationOptions = ({ navigation }) => {
    return {          
      title     : 'Home',
      headerStyle: {
        backgroundColor: '#34495e',   
        elevation: 0,
        shadowOpacity: 0     
      },      
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily:'Kanit-Regular'
      },
      tabBarVisible : false,
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
        <TouchableOpacity activeOpacity={0.6} key={i}  onPress={() => navigation.navigate('HomeDetail',{title:l.thai,theater_id:l.id})}>
        
          <ListItem  
              linearGradientProps={{
                colors: ['rgba(52, 73, 94,.7)', 'rgba(52, 73, 94,.75)']            
              }}
              ViewComponent={
                LinearGradient
              }         
            leftAvatar={{ title: l.english[0]}}
            title={l.english}           
            chevron  
            titleStyle={{fontSize:14,color:"white"}} 
            subtitleStyle={{fontSize:10,color:"white"}}                              
            subtitle={l.thai}    
           /*  rightTitle={<Rating  
              readonly={true}                        
              type='custom'
              imageSize={14}                                    
              startingValue={(l.stars && l.stars > 5) || l.stars == 0 ?5 : l.stars}                    
            />} */                      
          />
         
        </TouchableOpacity>
        
      ));
    }
    else{      
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
          marginBottom: 0,marginTop:0}}>                      
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

       {/* <View style={{flexDirection: 'row',justifyContent:'center'}}>
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
        </View> */}
       </View>
     )    
  }
}
const mapStateToProps = ({ movies }) => ({
  movies
});
// Later on in your styles..
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
const mapDispachToProps = ({ getMovies });
export default connect(mapStateToProps, mapDispachToProps)(HomeScreen);
