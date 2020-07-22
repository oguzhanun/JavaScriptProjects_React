import React from 'react';

const LanguageContext = React.createContext('english');

export class LanguageLogic extends React.Component{

    state = {language : 'english'}

    onLanguageChange = (language) => {
        this.setState({language});
    }

    render() {
        return(
            <LanguageContext.Provider value={{...this.state, onLanguageChange : this.onLanguageChange}}>
                {/** this.props.children ile LanguageContext in altına giren tüm child component lerin
                value nun imkanlarından faydalanmasını ve onu değiştirebilmesini sağlıyoruz... */
                    this.props.children}
            </LanguageContext.Provider>
        )
    }



}

export default LanguageContext;