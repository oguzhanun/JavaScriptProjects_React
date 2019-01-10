import {combineReducers} from 'redux';
import {postsReducers} from './postsReducers';
import {userReducer} from './userReducer';


export default combineReducers({
    posts:postsReducers,
    user:userReducer
});