import axios from 'axios';

export default axios.create({

    baseURL:'https://api.unsplash.com',
        
    headers:{
        Authorization: 'Client-ID 4b2d8b91e03ee4af96bb5acdb4ca1da07003264eda5161794f312b13ceefd82d'
    }
});