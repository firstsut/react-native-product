import Axios from 'axios';
const api_url = 'https://showtimes.everyday.in.th/api/v2/theater';  

export const getMovies = (url = null) => dispatch  => {
    if(url != null){
      dispatch({type : 'GET_MOVIES_MORE_REQUEST'});
    }else{
      dispatch({type : 'GET_MOVIES_REQUEST'});
    }    
    Axios.get(url || api_url).then(res=>{     
      dispatch({type : 'GET_MOVIES',payload : res.data});
    }).catch(err=>{
      dispatch({type : 'GET_MOVIES',payload : {results:[]}});
    }) 
  };