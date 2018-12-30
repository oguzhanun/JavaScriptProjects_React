import {combineReducers} from 'redux';

const songsReducer = () => {
    return[
        {title:'Zombie', duration:'4:05'},
        {title:'Bury The Hatcet', duration:'3:05'},
        {title:'Delailah', duration:'5:05'},
        {title:'Ode To My Family', duration:'3:45'},
    ];
};

const selectedSongReducer = (selectedSong = null, action) =>{
    
    if(action.type === 'SELECTED_SONG'){
        //selectedSong = action.payload; 
        return action.payload;
    }

    return selectedSong;
}

export default combineReducers({songs:songsReducer, selectedSong:selectedSongReducer });