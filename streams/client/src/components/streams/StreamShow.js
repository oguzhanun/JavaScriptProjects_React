import React from 'react';
import {connect} from 'react-redux';
import {streamFetch} from '../../actions';


class StreamShow extends React.Component {

    componentDidMount(){

        this.props.streamFetch(this.props.match.params.id);
    }

    render(){
       
        if(!this.props.stream){
            return (
                <div>
                    <h5>Loading...</h5>
                </div>
            );
        }
        
        const {title, description} = this.props.stream;

        return (
            <div>
                <br/>
                <div><h2>{title}</h2></div>
                <br/>
                <div><h4>{description}</h4></div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return(
        {
            stream : state.streams[ownProps.match.params.id]
        }
    );
}

export default connect(mapStateToProps, {streamFetch})(StreamShow);