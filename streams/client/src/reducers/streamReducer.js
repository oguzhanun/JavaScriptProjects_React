import _ from 'lodash';


export const streamReducer = (state = {} , action ) => {
    switch(action.type){
        
        case 'STREAMS_FETCH':
            return {...state, ..._.mapKeys(action.payload, 'id')}

        case 'STREAM_CREATE':
            return {...state, [action.payload.id] : action.payload } ;

        case 'STREAM_FETCH':
            return {...state, [action.payload.id] : action.payload } ;
    
        case 'STREAM_EDIT':
            return {...state, [action.payload.id] : action.payload } ;

        case 'STREAM_DELETE':
            return _.omit(state,action.payload);
        
        default:
            return state;
    }

}