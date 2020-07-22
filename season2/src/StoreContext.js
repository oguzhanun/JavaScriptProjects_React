import React from 'react';

const StoreContext = React.createContext();

export class ContextStore extends React.Component{

    state= {position:0};

    changeState = (position) =>{
        this.setState(position);
    }

    render = () =>{
        return (
            <StoreContext.Provider value={{...this.state, changeState:this.changeState}}>
                {this.props.children}
            </StoreContext.Provider>
        )
    }

}

export default StoreContext;