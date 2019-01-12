import React from 'react';
//import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {streamCreate} from '../../actions';
import StreamForm from './StreamForm';



class StreamCreate extends React.Component {

    
    onSubmit = (formValues) => {
        //console.log('Form değerleridir...',formValues);
        this.props.streamCreate(formValues);
    }

    render (){
        console.log(this.props);
        return(
            <div onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui div error'>
                <h3>Create a Stream</h3>
                <StreamForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}


export default connect(null, {streamCreate})(StreamCreate);