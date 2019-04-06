import Axios from 'axios';
const api_url = 'https://showtimes.everyday.in.th/api/v2/theater/?limit=20&offset=0';  

export const getMovies = (url = null,type_fetch = 'ALL') => dispatch  => {
    
    if(type_fetch == 'LOAD_MORE' && url != null){
      dispatch({type : 'GET_MOVIES_MORE_REQUEST'});
    }else{
      url = api_url;
      dispatch({type : 'GET_MOVIES_REQUEST'});
    }
    if(url!= null){
      Axios.get(url || api_url).then(res=>{     
        dispatch({type : 'GET_MOVIES',payload : res.data});
      }).catch(err=>{
        dispatch({type : 'GET_MOVIES',payload : {results:[]}});
      }) 
    }      
  };