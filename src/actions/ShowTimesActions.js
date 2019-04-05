import Axios from 'axios';
const api_url = 'https://showtimes.everyday.in.th/api/v2/theater';  

export const getShowTimes = (theaterId =null) => dispatch => {
    dispatch({type : 'GET_SHOWTIMES_REQUEST'});
    Axios.get(api_url+'/'+theaterId+'/showtimes').then(res=>{
        dispatch({type : 'GET_SHOWTIMES',payload : res.data});
    }) .catch(err=>{
        dispatch({type : 'GET_SHOWTIMES',payload : []});
    }) 
};