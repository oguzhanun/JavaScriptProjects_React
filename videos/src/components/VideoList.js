import React from 'react';
import VideoItem from './VideoItem';



const VideoList = (props) => {

   
    return(
        <div className="ui relaxed divided list">
            {props.videos.map((theVideo) =>{
                return(
                    <VideoItem key={theVideo.id.videoId} video={theVideo} onVideoSelect={props.onVideoSelect}/>
                );
        })
           
            }
        </div>
    );

}

export default VideoList;