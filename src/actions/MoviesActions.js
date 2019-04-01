import Axios from 'axios';
const api_url = 'https://showtimes.everyday.in.th/api/v2/theater';  

export const getMovies = () => {
  return dispatch =>{
    Axios.get(api_url).then(res=>{
      dispatch({type : 'GET_MOVIES',payload : res.data.results});
    }) 
    }
  };