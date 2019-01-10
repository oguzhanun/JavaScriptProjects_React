import React from 'react';
import {connect} from 'react-redux';
import {fetchPostsAndUser} from '../actions';
import UserHeader from './UserHeader';

class PostList extends React.Component{


    componentDidMount(){
        this.props.fetchPostsAndUser();
    }

    renderList = () => {

        return this.props.posts.map( (post) =>{
            return (
                <div className='item' key={post.id}>
                    <i className='large middle aligned icon user'/>
                    <div className='content'>
                        <div className='description'>
                            <h2>
                                {post.title}
                            </h2>

                            <p>
                                {post.body}
                            </p>
                        </div>
                        <UserHeader userId={post.userId}/>
                    </div>
                </div>
            );
        })
    }                         
            

    render(){
        
        //console.log('hello my friend', this.props.posts)
        
        return(
            <div className='container ui'>{this.renderList()}</div>
        );
    }
}

const mapStateToProps = (state) => {
 
    //console.log('postlistin mapstatetopropsı :' , state.posts)  // ?_?_?_?_?_?_?_?_?_?_?_?_?_?_?_?_?_?_?_?_?
                                                                // console çıktısında 100 adet postun 100 request ile tekrar
                                                                // ve tekrar istendiğini gösteriyor. Ya da aynı verinin 100
                                                                // defa tekrar bağlama yapıldığını gösteriyor. 
                                                                //?_?_?_?_??_?_?_?
    return {posts : state.posts};
}

export default connect(mapStateToProps, {fetchPostsAndUser} )(PostList);