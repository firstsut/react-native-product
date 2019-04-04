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
    return(
      <View style={{flex: 1,  flexDirection: 'column',justifyContent: 'space-around'}}>
        <View style={{flex: 1}}>
                <Badge textStyle={{color:"#7f8c8d"}} badgeStyle={{backgroundColor:"#eee"}} containerStyle={{ position: 'absolute', left: 0,top:10}} value={l.audio? l.audio.toUpperCase():'TH'} status="warning" />
                <Badge textStyle={{color:"#7f8c8d"}} badgeStyle={{backgroundColor:"#eee"}} containerStyle={{ position: 'absolute', left: 30,top:10}} value={l.technology.toUpperCase()} status="warning" />         
                <Badge textStyle={{color:"#7f8c8d"}} badgeStyle={{backgroundColor:"#eee",display:(l.cinema && l.cinema != '-' ? 'flex' : 'none')}} containerStyle={{ position: 'absolute', left: 60,top:10}} value={l.cinema && l.cinema != '-' ? l.cinema.toUpperCase():'-'} status="warning" />
          </View>                            
        <View style={{flex: 1}}>        
        {
           l.showtimes.map((item,i)=>{
             return (
              <Badge key={item} textStyle={{color:"#7f8c8d"}} badgeStyle={{backgroundColor:"#eee"}} containerStyle={{ position: 'absolute', left: ((i)*45)}} value={item} status="warning" />              
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
          <Animatable.View   key={i}      animation="fadeInDown"  delay={100}> 
          <ListItem     
            linearGradientProps={{
              colors: ['rgba(52, 73, 94,.7)', 'rgba(52, 73, 94,.8)']            
            }}
            ViewComponent={
              LinearGradient
            }                                     
            containerStyle={{padding:0,margin:0,minHeight:120,minWidth:90,borderWidth:0,borderColor:'transparent'}} 
            leftAvatar={{containerStyle:{minHeight:120,minWidth:90},avatarStyle:{minHeight:120,minWidth:90},size:'large',rounded:false,source: { uri: l.movie_poster.substring(0,l.movie_poster.indexOf('.jpg')+4)} }}   
            titleStyle={{fontSize:24,marginTop:20,color:'white'}}            
            rightTitle={<Badge textStyle={{color:'#34495e'}} badgeStyle={{backgroundColor:"#f5d557",borderWidth:0,position:'relative',bottom:20,padding:8,right:5}} value={l.movie_duration+' MIN'} status="warning" />}                                               
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