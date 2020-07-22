import React from 'react';
import {Field, reduxForm} from 'redux-form';



class StreamForm extends React.Component {


    renderErrorMessage = ({error, touched}) => {

        if(touched && error ){
            return(
                <div className='ui error message'>
                    {error}
                </div>
            );
        } else return null;
    }


    renderInput = ({input, label, meta}) => {   // "formProps" kapsayıcı değişken

        //console.log(meta);

        const className = `field ${meta.error && meta.touched ? 'error':''}`
        
        return (
                // ya da formProps kullanılırsa {...formProps.input}  kullanılabilir...
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderErrorMessage(meta)} 
            </div>

            // <input onChange={formProps.input.onChange} value={formProps.input.value}/> // Burada olduğu gibi form 
                                                                                          // girdileri ve tepkileri otomatik
                                                                                          // olarak bağlanabiliyor. Kısa yolda
                                                                                          // {input} fonksiyon girdisi kullanılabilir.
                                                                                          // ve form input tag ine {...input} eşitlik
                                                                                          // olmadan attribute olarak yazılabilir. 
        );

    }
    
    onSubmit = (formValues) => {
        //console.log('Form değerleridir...',formValues);
        this.props.onSubmit(formValues);
    }

    render (){
    //    console.log(this.props);
        return(
            //handleSubmit ile preventDefault metodunu kullanmaya gerek kalmıyor...
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>{/** classname olarak error ifadesi eklenmediğinde semantic ui default olarak önleme yapıyor... */}
                <Field name='title' component={this.renderInput} label='Enter Title : '></Field>
                <Field name='description' component={this.renderInput} label='Enter Description : '></Field>
                <button className='ui button primary'>Submit</button>
            </form>
        );
    }
}


var validate = (formValues) => {

    const errors = {};

    if(!formValues.title){
        errors.title = 'You must enter a title name' 
    }

    if(!formValues.description){
        errors.description = 'You must enter a description' 
    }

    return errors;
}

export default reduxForm({
    form: 'StreamForm',
    validate
})(StreamForm);

//export default connect(null, {streamCreate})(wrappedForm)