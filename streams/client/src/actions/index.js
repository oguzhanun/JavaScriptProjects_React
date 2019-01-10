import streams from '../apis/streams';
import history from '../history';
export const signIn = (userId) => {
    return {
        type : 'SIGN_IN',
        payload : userId
    };
};

export const signOut = () => {
    return {
        type:'SIGN_OUT'
    };
};

export const streamCreate = (formValues) => {
    return async (dispatch, getState) => {
        const {userId} = getState().auth;
        const response = await streams.post('/streams',{...formValues, userId});

        dispatch({type:'STREAM_CREATE', payload : response.data});

        // programatik olarak başka bir sayfaya geçmeyi sağlıyor..
        history.push('/');

    }
}

export const streamsFetch = () => {
    return async (dispatch) => {
        const response = await streams.get('/streams');

        dispatch({type:'STREAMS_FETCH', payload : response.data});
    }
}

export const streamFetch = (id) => {
    return async (dispatch) => {
        const response = await streams.get(`/streams/${id}`);

        dispatch({type:'STREAM_FETCH', payload : response.data});
    }
}

export const streamEdit = (id, formValues) => {
    return async (dispatch) => {
        const response = await streams.put(`/streams/${id}` , formValues);

        dispatch({type:'STREAM_EDIT', payload : response.data});
    }
}

export const streamDelete = (id) => {
    return async (dispatch) => {
        await streams.delete(`/streams/${id}`);

        dispatch({type:'STREAM_DELETE', payload : id});
    }
}
