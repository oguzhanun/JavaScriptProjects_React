import React from 'react';

const VideoDetail = (props) =>{


    if(!props.onVideoSelected){
        return(<div>Waiting!...</div>);
    }
    const link = `https://www.youtube.com/embed/${props.onVideoSelected.id.videoId}`;

    return(
        <div>
            <div className="ui embed">
                <iframe title="video player" src={link} />
            </div>
            <div className="ui segment">
                <h4 className="ui header">{props.onVideoSelected.snippet.title}</h4>
                <p>{props.onVideoSelected.snippet.description}</p>
            </div>
        </div>

    );
}

export default VideoDetail;