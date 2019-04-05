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
      loading : false ,
      date:  date + '/' + month + '/' + year 
    }    
  }

  getSubTitle(l){  
    let vip_label = <Text style={{height:0}}></Text>; 
    if( l.cinema && l.cinema != '-'){
      vip_label = <Badge textStyle={{color:"rgba(236, 240, 241,.9)"}} badgeStyle={{backgroundColor:"rgba(25,25,25,.5)",borderColor:"rgba(25,25,25,.8)",padding:5,margin:3,marginBottom:1}}  value={l.cinema && l.cinema != '-' ? l.cinema.toUpperCase():'-'} status="warning" />
    }
    return(
      <View style={{flex: 1,  flexDirection: 'column'}}>
         <View style={{flex: 1,flexDirection:"row",flexWrap:"wrap",marginBottom:0,marginTop:5}}>
                <Badge textStyle={{color:"rgba(236, 240, 241,.9)"}} badgeStyle={{backgroundColor:"rgba(25,25,25,.5)",borderColor:"rgba(25,25,25,.8)",padding:5,margin:3,marginBottom:1}} value={l.audio? l.audio.toUpperCase():'TH'} status="warning" />
                <Badge textStyle={{color:"rgba(236, 240, 241,.9)"}} badgeStyle={{backgroundColor:"rgba(25,25,25,.5)",borderColor:"rgba(25,25,25,.8)",padding:5,margin:3,marginBottom:1}}  value={l.technology.toUpperCase()} status="warning" />         
                {
                 vip_label
                }
                
          </View>       
        <View style={{flex: 1,flexDirection:"row",flexWrap:"wrap",marginBottom:10}}>        
        {
           l.showtimes.map((item,i)=>{
             return (
              <Badge key={item} textStyle={{color:"rgba(236, 240, 241,.9)"}} badgeStyle={{backgroundColor:"rgba(25,25,25,.5)",borderColor:"rgba(25,25,25,.8)",padding:5,margin:3}}  value={item} status="warning" />
             )
           })
         } 
        </View>
                             
       
      </View>               
    )
  }

  showTimes(){
    if(!this.state.loading && this.props.showtimes){           
      return this.props.showtimes.map((l, i) => (     
          <Animatable.View   key={i}      animation="fadeInDown"> 
          <ListItem     
            linearGradientProps={{
              colors: ['rgba(52, 73, 94,.7)', 'rgba(52, 73, 94,.8)']            
            }}
            ViewComponent={
              LinearGradient
            }                                     
            containerStyle={{padding:0,margin:0,borderWidth:0,borderColor:'transparent'}} 
            leftAvatar={{containerStyle:{minHeight:130,minWidth:100},size:'large',rounded:false,source: { resizeMode: "cover", uri: l.movie_poster.substring(0,l.movie_poster.indexOf('.jpg')+4)} }}   
            titleStyle={{fontSize:20,marginTop:30,color:'white'}} 
            titleProps={{flex:1,numberOfLines:1}}           
            rightTitle={<Badge textStyle={{color:'#34495e',fontWeight:"normal"}} badgeStyle={{backgroundColor:"#f5d557",borderWidth:0,position:'relative',bottom:20,padding:8,right:5}} value={l.movie_duration+' MIN'} status="warning" />}                                               
            title={l.movie_title} 
            subtitle={this.getSubTitle(l)}                                      
        />   
        </Animatable.View>                    
      ));
    }else{
      return (
          <ContentLoading type="showtime" length={10}/>
      )
    }   
  }

  async getList(){
    setTimeout(
      function() {
        const {navigation} = this.props;
        this.props.getShowTimes(navigation.getParam('theater_id'));
        this.stopLoading(); 
      }
      .bind(this),
      200
    );   
  }

  stopLoading() {       
    this.setState({loading: false});   
  }

  async componentWillMount() {  
    this.setState({loading: true}); 
    setTimeout(
      function() {
        this.props.getShowTimes(null);
      }
      .bind(this),
      100
    );       
  }

  async componentDidMount() {  
    this.setState({loading: true});   
    this.getList();
  }

  _onRefresh =async () => {    
    this.setState({loading: true});  
    this.getList();       
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
  showtimes
});

const mapDispachToProps = ({ getShowTimes });

export default connect(mapStateToProps, mapDispachToProps)(HomeDetailScreen);