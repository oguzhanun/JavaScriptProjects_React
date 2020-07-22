import React from 'react';
import './ImageList.css';
import ImageCard from './ImageCard';

const ImageList = (props) =>{

    //const images = props.images.map( (image) =>{
    //    return(<ImageCard  key={image.id} imageSend={image}/>);
    //});

    return(
        <div className='image-list'>{props.images.map( (image) => 
        {
            return(<ImageCard  key={image.id} imageSend={image}/>);
        })
        }</div>
    );
}

export default ImageList;