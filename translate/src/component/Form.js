import React from 'react';
import LanguageContext from '../contexts/LanguageContext';


class Form extends React.Component{

    static contextType = LanguageContext;


    renderName = (language) => {
        return language === 'english' ? 'Name' : 'Naam';
    }
    render(){

        return (
            <form className='ui form'>
                <br/>
                <label>{this.renderName(this.context.language)}</label>
                <br/><br/>
                <input type='text' className='ui input'></input>
                <br/><br/>
            </form>
        );
    }


}

export default Form;