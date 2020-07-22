import React from 'react';
import StoreContext, {ContextStore} from '../StoreContext';
import Latitude from './Latitude';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';


const App = (props) => {

    const [state, setState] = React.useState({lat:null, error:''});
    
    //static contextType = Context;

    const position = async () => {
        return await navigator.geolocation.getCurrentPosition((position) => {
            setState({lat:position.coords.latitude});
            //changePosition(position.coords.latitude);
        },
            (err) => setState({error:err.message})
        );
    }
    
    
    React.useEffect(()=>{
        position();
    }, [])

    const renderContent = () =>{
        if(!state.error && state.lat){
            return(
                <SeasonDisplay lat={state.lat} month={new Date().getMonth()}/>
            );
        }

        if(state.error && !state.lat){
            return(
                <div>Error: {state.error} </div>
            );
        }

        if(!state.error && !state.lat){
            return(
                <Spinner />
            );
        }
    }

    return(
        <ContextStore>
            <StoreContext.Consumer>
                {()=>{
                   
                        return(
                            <div>
                                <Latitude/>
                                <div style={{border:'solid red 2px'}}>
                                        {renderContent()}</div>
                            </div>
                        )    
                    }    
                }
            </StoreContext.Consumer>
        </ContextStore>
    );
}

export default App;