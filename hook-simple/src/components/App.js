import React, {useState} from 'react';
import ResourceList from './ResourceList';
import Users from './Users';


const App = () => {

    const [ resource, setResource ] = useState( 'posts' );

    return(
        <div>
            <button onClick={() => setResource('posts')}>Posts</button>
            <button onClick={() => setResource('todos')}>Todos</button>
            <Users/>
            <ResourceList resource={resource}/>
            {resource}
        </div>)
}

export default App;