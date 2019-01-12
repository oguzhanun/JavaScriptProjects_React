import React from 'react';


class SearchBar extends React.Component{

    state = {term:''}

    onInputChange(event){
        console.log(event.target.value);
    }

    /*onInputClick(event){
        console.log("sorry son this is what I have done....");
    }*/

    onFormSubmit= (event)=>{ // arrow function ile "this" property sinin okunmasını 
                             // engelleyen durumu ortadan kaldırıyoruz.

        event.preventDefault();
        this.props.onMySubmit(this.state.term); // bu fonksiyon aracılığıyla searchbar a girilen veri App component i
        // içindeki onMySubmit ile belirlenen fonksiyona iletiliyor.
    }

    render(){
        return(
            <div className="ui segment">
                <form onSubmit={(event)=>this.onFormSubmit(event)} className="ui form">
                    <div className="field">
                        <label>Image Search</label>
                        <input type="text" 
                            onChange={ (event) => {
                                    this.setState({term:event.target.value});
                                    console.log(this.state.term);
                                }} 
                            value={this.state.term}
                            onClick={() => 
                                {console.log('you clicked my friend....')
                                }}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;