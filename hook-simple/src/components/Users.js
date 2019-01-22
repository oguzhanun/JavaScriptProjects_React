import React from 'react';
import useResources from './useResources';


const Users = () => {

    const response = useResources('users');

    return(
        <div>
            <ul>
                {response.map( record => {return (
                    <li key={record.id}>{record.name}</li>
                )})}
            </ul>
        </div>
    );
}

export default Users;