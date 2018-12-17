import React from 'react';
import Faker from 'faker';

const CommentDetail=(props)=>{
    console.log(props);
    return (
        <div className="comment">
            <a className="avatar" href="/">
                <img alt="avatar" src={props.avatar}/>
            </a>
            <div className="content">
                <a className="author" href="/">{props.author}</a>
                <div className="metadata">
                    <span className="date">{props.time}</span>
                </div>
                <div className="text">Nice blog post!</div>
            </div>
        </div>
    );
};

export default CommentDetail;