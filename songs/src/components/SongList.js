import React from 'react';
import {connect} from 'react-redux';
import {selectedSong} from '../actions';


class SongList extends React.Component{

    renderList = () => {
        
        
        return this.props.songs.map((song)=>{
            return (
                <div key={song.title} className='item'>

                    <div className='right floated content' style={{verticalAlign:'middle'}}>
                        <button onClick={() =>{
                           this.props.selectedSong(song);
                           
                            
                        }} className='ui button primary'>Select</button>
                    </div>

                    <div className='content' style={{display:'inline-block'}} >{song.title}</div>
                </div>
            );
        });
    }

    render(){
    
        console.log(this.props.selectedSong);
    
        return(
            <div className='ui divided list'>{this.renderList()}</div>
        );
    }
}

const mapStateToProps = (state) => {

    console.log(state);
    return {songs : state.songs};
}

export default connect(mapStateToProps, {selectedSong})(SongList);