import Axios from 'axios';
const api_url = 'https://showtimes.everyday.in.th/api/v2/theater';  

export const getShowTimes = (theaterId =null) => {
    return dispatch =>{
        if(theaterId == null){
            dispatch({type : 'GET_SHOWTIMES',payload : []});
        }else{
            Axios.get(api_url+'/'+theaterId+'/showtimes').then(res=>{
                dispatch({type : 'GET_SHOWTIMES',payload : res.data.results});
            }) .catch(err=>{
                dispatch({type : 'GET_SHOWTIMES',payload : []});
              }) 
        }
        
    }
};