import React from 'react';
import ReactDOM from 'react-dom';
import Faker from 'faker';
import CommentDetail from './CommentDetail'
import ApprovalCard from './ApprovalCard'

const App = ()=>{
    return (
        <div className="ui container comments">
            <ApprovalCard>
                <CommentDetail author="Sam" avatar={Faker.image.avatar()} time="Today at 04:00PM"/>
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail author="Alex" avatar={Faker.image.avatar()} time="Today at 01:00AM"/>
            </ApprovalCard>
            <ApprovalCard>
                <CommentDetail author="Jane" avatar={Faker.image.avatar()} time="Yesterday at 08:00PM"/>
            </ApprovalCard>
            
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector('#root'));