import React, {Component} from 'react';
import {  ListItem,Text,Card,Icon,Button } from 'react-native-elements';
export default class ContentLoading extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {length,type} = this.props;
        let result = []
        for (let i = 0; i < length; i++) {
            result.push(i);
        }
        if(type == 'showtime'){
            return result.map(index=>{
                return (
                
                    <ListItem    
                        key={index}  
                        leftAvatar={{ title: ' ',avatarStyle:{backgroundColor:'#ecf0f1'}}}
                        title=' '  
                        titleStyle={{flex:1,height:20,backgroundColor:'#ecf0f1'}}         
                        subtitle=' '
                        subtitleStyle={{height:20,backgroundColor:'#ecf0f1',marginTop:10}}
                    />
                
                    
                ) 
         })  
        }else{
            return result.map(index=>{
                        return (
                        
                            <ListItem    
                                key={index}  
                                leftAvatar={{ title: ' ',avatarStyle:{backgroundColor:'#ecf0f1'}}}
                                title=' '  
                                titleStyle={{flex:1,height:20,backgroundColor:'#ecf0f1'}}         
                                subtitle=' '
                                subtitleStyle={{height:20,backgroundColor:'#ecf0f1',marginTop:10}}
                            />
                        
                            
                        )
                    }) 
        }
              
    }
    /* <ContentLoader 
                    key={index}
                    height={80}
                    width={400}
                    duration={1000}
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"
                >
                    <Rect x="89" y="18" rx="4" ry="4" width="297" height="14" /> 
                    <Rect x="89" y="42" rx="3" ry="3" width="270" height="14" /> 
                    <Circle cx="47" cy="40" r="30" />
                </ContentLoader> */
}