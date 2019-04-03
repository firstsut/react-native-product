import React from 'react';
import { View,ScrollView,RefreshControl } from 'react-native';
import { Text,Divider,Icon,ListItem,Badge } from 'react-native-elements';
import styles from '../styles';
import {connect} from 'react-redux';
import { getShowTimes } from '../actions';
import  ContentLoading  from '../components/ContentLoading';

class HomeDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {          
      title     : navigation.getParam('title'),
      headerStyle: {
        backgroundColor: 'rgba(46, 204, 113,.8)',
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
      loading : true ,
      date:  date + '/' + month + '/' + year 
    }    
  }

  getSubTitle(l){
    let vip = <Text></Text>;
    if(l.cinema){
        vip = <Badge textStyle={{color:"#95a5a6"}} badgeStyle={{backgroundColor:"#eee"}} containerStyle={{ position: 'absolute', left: 60}} value={l.cinema.toUpperCase()} status="warning" />         
    }
    return(
      <View>
        <Badge textStyle={{color:"#95a5a6"}} badgeStyle={{backgroundColor:"#eee"}} containerStyle={{ position: 'absolute', left: 0}} value={l.audio? l.audio.toUpperCase():'TH'} status="warning" />
        <Badge textStyle={{color:"#95a5a6"}} badgeStyle={{backgroundColor:"#eee"}} containerStyle={{ position: 'absolute', left: 30}} value={l.technology.toUpperCase()} status="warning" />         
        {vip}
      </View>
        
    )
  }

  showTimes(){
    if(!this.state.loading && this.props.showtimes && this.props.showtimes.length > 0){          
      return this.props.showtimes.map((l, i) => (            
          <ListItem    
            key={i}  
            bottomDivider={true}  
            leftAvatar={{size:'large',rounded:false,source: { uri: l.movie_poster.substring(0,l.movie_poster.indexOf('.jpg')+4)} }}   
            titleStyle={{fontSize:16,marginBottom:15}}            
            rightTitle={<Badge style={{marginBottom:15}} value={l.movie_duration+' MIN'} status="warning" />}                                            
            title={l.movie_title}  
            subtitle={this.getSubTitle(l)}              
        />                       
      ));
    } else{
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
    this.props.getShowTimes(null);
  }

  async componentDidMount() {  
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
        marginBottom: 1}}>  

                <ListItem               
                title= {this.state.date}
                leftIcon={{ name: 'calendar',type:"font-awesome" , size:30,color:"#27ae60"}}
              /> 
              <Divider style={{ backgroundColor: 'grey' }} />                                              
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