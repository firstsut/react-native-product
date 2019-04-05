import React from 'react';
import { View,ScrollView,RefreshControl,StyleSheet  } from 'react-native';
import { Text,Divider,Icon,ListItem,Badge } from 'react-native-elements';
import {connect} from 'react-redux';
import { getShowTimes } from '../actions';
import  ContentLoading  from '../components/ContentLoading';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';


class HomeDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {          
      title     : navigation.getParam('title'),
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
    };
  };

  constructor(props){
    super(props);
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    this.state = {     
      date:  date + '/' + month + '/' + year 
    }    
  }

  getSubTitle(l){  
    let vip_label = <Text style={{height:0}}></Text>; 
    if( l.cinema && l.cinema != '-'){
      vip_label = <Badge textStyle={{color:"rgba(127, 140, 141,1.0)"}} badgeStyle={{backgroundColor:"rgba(236, 240, 241,1.0)",borderColor:"rgba(236, 240, 241,1.0)",padding:5,margin:3}}  value={l.cinema && l.cinema != '-' ? l.cinema.toUpperCase():'-'} status="warning" />
    }
    return(
      
      <View style={{flex: 1,  flexDirection: 'column'}}>
          
        <View style={{flex: 1,flexDirection:"row",flexWrap:"wrap",marginBottom:0,paddingTop:10}}>        
        {
           l.showtimes.map((item,i)=>{
             return (
              <Badge key={item} textStyle={{color:"rgba(236, 240, 241,.9)"}} badgeStyle={{backgroundColor:"rgba(25,25,25,.65)",borderColor:"rgba(25,25,25,1)",padding:5,margin:3}}  value={item} status="warning" />
             )
           })
         } 
        </View>
        <View style={{flex: 1,flexDirection:"row",marginTop:0,paddingBottom:20}}>
        <Badge textStyle={{color:'rgba(127, 140, 141,1.0)',fontWeight:"normal"}} badgeStyle={{backgroundColor:"rgba(236, 240, 241,1.0)",borderWidth:0,padding:5,margin:3}} value={l.movie_duration+' MIN'} status="warning" />                                               
                <Badge textStyle={{color:"rgba(127, 140, 141,1.0)"}} badgeStyle={{backgroundColor:"rgba(236, 240, 241,1.0)",borderColor:"rgba(236, 240, 241,1.0)",padding:5,margin:3}} value={l.audio? l.audio.toUpperCase():'TH'} status="warning" />
                <Badge textStyle={{color:"rgba(127, 140, 141,1.0)"}} badgeStyle={{backgroundColor:"rgba(236, 240, 241,1.0)",borderColor:"rgba(236, 240, 241,1.0)",padding:5,margin:3}}  value={l.technology.toUpperCase()} status="warning" />         
                {
                 vip_label
                }                                
          </View>                           
       
      </View>               
    )
  }

  showTimes(){
    if(this.props.isFetching){
      return (
        <ContentLoading type="showtime" length={10}/>
      )
    }
    else if(!this.props.isFetching && this.props.showtimes){           
      return this.props.showtimes.map((l, i) => (     
          <Animatable.View   key={i}   delay={400}   animation="fadeInDown"> 
         
          <ListItem     
            linearGradientProps={{
              colors: ['rgba(52, 73, 94,.7)', 'rgba(52, 73, 94,.8)']            
            }}
            ViewComponent={
              LinearGradient
            }                                     
            containerStyle={{padding:0,margin:0,borderWidth:0,borderColor:'transparent',minHeight:120}} 
            leftAvatar={{containerStyle:{height:'auto',minWidth:100},size:'large',rounded:false,source: { resizeMode: "contain", uri: l.movie_poster.substring(0,l.movie_poster.indexOf('.jpg')+4)} }}   
            titleStyle={{fontSize:20,marginTop:10,color:'white'}} 
            titleProps={{flex:1,numberOfLines:1}}                       
            title={l.movie_title} 
            subtitle={this.getSubTitle(l)}                                      
        />   
       
        </Animatable.View>                    
      ));
    }  
  }

  async componentDidMount() {  
    const {navigation} = this.props;
    this.props.getShowTimes(navigation.getParam('theater_id'));  
  }

  _onRefresh =async () => {   
    const {navigation} = this.props; 
    this.props.getShowTimes(navigation.getParam('theater_id'));       
  }

  render() {
    return (
      <View style={{flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 0,backgroundColor:"rgba(52, 73, 94,0.9)"}}>  

            <ListItem   
                            
                title= {this.state.date}
                titleStyle={{color:"white"}}
                containerStyle={{backgroundColor:"#34495e"}}
                leftIcon={{ name: 'calendar',type:"font-awesome" , size:30,color:"white"}}
              /> 
                                                           
             <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={false}
                    onRefresh={()=>this._onRefresh()}
                  />
                }              
                overScrollMode="always">
                <View style={{flex: 1}}>   
                  {this.showTimes()} 
                </View>           
          </ScrollView >
      </View>
    );
  }
}
const mapStateToProps = ({ showtimes }) => ({
  showtimes : showtimes.results,
  isFetching : showtimes.isFetching
});

const mapDispachToProps = ({ getShowTimes });

export default connect(mapStateToProps, mapDispachToProps)(HomeDetailScreen);