
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component{
    
    constructor(props){
        
        super(props);
        this.state={lat:null, errorMessage:null};
        this.anything={a:3};
        
        
    }

    renderContent(){
        if(!this.state.errorMessage && this.state.lat){
            return(
                <SeasonDisplay lat={this.state.lat} month={new Date().getMonth()}/>
            );
        }

        if(this.state.errorMessage && !this.state.lat){
            return(
                <div>Error: {this.state.errorMessage} </div>
            );
        }

        if(!this.state.errorMessage && !this.state.lat){
            return(
                <Spinner />
            );
        }
    };

    render(){
        
        return (
            <div style={{border:'solid red 2px'}}>
                {this.renderContent()}
            </div>
        );

    }
    
    componentDidMount(){
        console.log('My component mounted');
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat : position.coords.latitude}),
            (err) => this.setState({errorMessage : err.message})
        );
    }

    componentDidUpdate(){
        console.log('My component updated');
    }
    
}


ReactDOM.render(

    <App/>, document.querySelector('#root')
);