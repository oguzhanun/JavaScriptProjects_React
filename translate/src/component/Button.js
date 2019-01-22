import React from 'react';
import LanguageContext from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';



class Button extends React.Component{

    // bu kod parçası ile context ile bağlantı kuruyoruz.
    // this.context ile veriyi kullanabiliyoruz. Ama tek context varken bu durum işe yarıyor. çoklu context lerde
    // kullanılamıyor. 

    //static contextType = LanguageContext;  
    

    renderButton = (language) => {
        const sth = language === "english" ? "Submit" : "Voorleggen"
        return sth;
    }

    // "value" değişkeni consumer context i ile aynı satırda oldğunda uygulama hata veriyor....?_?_?_?_?_?_?_?
    // süslü parantez ekleyip return deyince sorun yok...
    render(){
        return (
            <ColorContext.Consumer>{
                (color) => {
                    return (<button className={`ui button ${color}`}>
                        <LanguageContext.Consumer>{({language}) => {
                            return (this.renderButton(language));
                        }}
                        </LanguageContext.Consumer>
                    </button>);
                }}</ColorContext.Consumer>
        );
    }
}

export default Button;