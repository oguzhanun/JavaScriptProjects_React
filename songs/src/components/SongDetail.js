import React from 'react';
import {connect} from 'react-redux';


const SongDetail = (props) => {

    if(!props.selectedSong){
        return (<div>Select A Song Please!!!</div>);
    }
    return (
        <div>
            <h2>Song Details:</h2>
            <p>
                Title : {props.selectedSong.title}
                <br/>
                Duration : {props.selectedSong.duration}            
            </p>
        </div>
    );
}

const mapStateToProps = (state) => {

    return {selectedSong : state.selectedSong};
}

export default connect(mapStateToProps)(SongDetail);