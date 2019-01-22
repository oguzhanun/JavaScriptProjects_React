import React from 'react';
import useResources from './useResources';


//class ResourceList extends React.Component{
const ResourceList = ({ resource }) => {

    const response = useResources(resource);
    
//  state = { response : [] };
    

    return(<div>
        the length of response is : <br/>
        <ul>{response.map( record => {
            return (
                <li key={record.id}>{record.title}</li>
            )
        } )}</ul>
    </div>);
}

export default ResourceList;