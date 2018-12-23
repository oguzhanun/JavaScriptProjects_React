import React from 'react';


class SearchBar extends React.Component{

    state = {stateTerm : ''};

    onInputChange = (event) =>{
        this.setState({stateTerm : event.target.value});
        console.log(this.state.stateTerm);
    }

    onFormSubmit = (event)=>{
        event.preventDefault();

        this.props.onFormSubmitMethod(this.state.stateTerm);
    }
    
    render(){

        return(
            <div className='ui segment'>
                <form className='ui form' onSubmit={this.onFormSubmit}>
                    <div className='field'>
                        <label>Video Search : </label>
                        <input type="text"  onChange={(event) => {
                            this.setState({stateTerm:event.target.value});
                            console.log(this.state.stateTerm);
                        }} value={this.state.stateTerm}/>
                    </div>
                </form>
            </div>
        );
    }
}


export default SearchBar;