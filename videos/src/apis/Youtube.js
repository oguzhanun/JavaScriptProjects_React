import Axios from 'axios';

const KEY ='AIzaSyC8JYnlSGXX_AilW4HCJYIooR9iw2-XZIc';

export default Axios.create(
    {
        baseURL:'https://www.googleapis.com/youtube/v3',

        params:{
            part:'snippet',
            maxResults:10,
            key: KEY
        }
    }
);