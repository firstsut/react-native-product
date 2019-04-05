import React, {Component} from 'react';
import {ScrollView,RefreshControl,View,TouchableOpacity,StyleSheet,Animated,ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {  ListItem ,Header,Icon,Button,Rating,Text,Input } from 'react-native-elements';
import ContentLoading from '../components/ContentLoading';
import { connect } from 'react-redux';
import { getMovies } from '../actions';
import LinearGradient from 'react-native-linear-gradient';



class HomeScreen extends Component{
  static navigationOptions = ({ navigation }) => {
    return {          
      title     : 'Home',
      headerStyle: {
        backgroundColor: 'rgba(52, 73, 94,1.0)',   
        elevation: 0,
        shadowOpacity: 0 ,
        height:80,              
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
        scrollY: new Animated.Value(0),                  
    }    
  }

  
  showMovies(){
    console.log(this.props.isFetching)
    if(this.props.isFetching){
      return (
        <ContentLoading length={10}/>
      )
    }
    else if( (!this.props.isFetching || !this.props.isLoadmore) && this.props.movies){    
      const { navigation } = this.props;  
      return this.props.movies.map((l, i) => (
        <TouchableOpacity activeOpacity={0.6} key={i}  onPress={() => navigation.navigate('HomeDetail',{title:l.thai,theater_id:l.id})}>
        
          <ListItem  
              linearGradientProps={{
                colors: ['rgba(52, 73, 94,.7)', 'rgba(52, 73, 94,.8)']            
              }}
              ViewComponent={
                LinearGradient
              }       
            containerStyle={{padding:8,margin:0,borderColor:'transparent'}}   
            leftAvatar={{ avatarStyle:{backgroundColor:"transparent"},title: l.english[0],size:"large",titleStyle:{color:"black"}}}
            title={l.english} 
            titleProps={{flex:1,numberOfLines:1}}             
            chevron  
            titleStyle={{fontSize:14,color:"white"}} 
            subtitleStyle={{fontSize:10,color:"white"}}                              
            subtitle={l.thai}                          
          />
         
        </TouchableOpacity>
        
      ));
    }
    else{      
      
    }    
  }

  async clearShowRealApp(){    
    try {
      const chk = await AsyncStorage.setItem('@SHOW_REAL_APP', 'N',(err)=>{
        if(!err) this.props.navigation.navigate('GetStart');   
      });         
        
    } catch (error) {
     
    }
    
  }
  async componentDidMount() { 
    this.props.getMovies();         
  }

  _onRefresh =async () => {    
    this.props.getMovies();         
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
  }

  async loadMoreData(){
    if (this.props.isLoadmore) {
      return
    }
    if(!this.props.isLoadmore && !this.props.isLoadmore && this.props.movies && this.props.next){
      this.props.getMovies(this.props.next);
    }
    return
  }  

  render() {      
    return (
      
        <View style={{flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 0,marginTop:0}}>            
          {/* <Input
              shake={true}
              placeholder='INPUT WITH CUSTOM ICON'
              leftIcon={
                <Icon
                  type="font-awesome"
                  name='search'
                  size={24}
                  color='black'
                />
              }
            />       */}            
         <ScrollView
            refreshControl={
           <RefreshControl
             refreshing={false}
             onRefresh={()=>this._onRefresh()}
           />
           
         }          
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          {
            listener: event => {
              if (this.isCloseToBottom(event.nativeEvent)) {
                this.loadMoreData()
              }
            }
          }
        )}
        >
         {this.showMovies()}
         {
           this.props.isLoadmore &&
           <View style={{flex:1,minHeight:50,marginTop:30,marginBottom:30}}>
            <ActivityIndicator size="small" color="#000000" />
          </View>
         }   
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
  movies : movies.results,
  next : movies.next,
  isFetching : movies.isFetching,
  isLoadmore : movies.isLoadmore,
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
