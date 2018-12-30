import JsonPlaceholder from '../apis/JsonPlaceholder';


export const fetchPosts = () => async dispatch => {
        const response = await JsonPlaceholder.get('/blog');

        dispatch ({
            type : 'FETCH_POSTS',
            payload: response
        });
    };