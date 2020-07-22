import React from 'react'
import StoreContext from '../StoreContext';

const Latitude = () =>{
    return(
        <StoreContext.Consumer>
            {({position})=>console.log(position)}
        </StoreContext.Consumer>
    );
}

export default Latitude;