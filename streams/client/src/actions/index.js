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
        // Burada patch yerine put koyarsak ve yalnızca değiştirmek istediğimiz verileri stream içine yazarsak
        // put komutunun bir gereği olarak mevcut eski tüm veriler silinir ve yerine sadece değişen veriler
        // yazılır. Bunun sonucunda ise değişmeyen veriler kaybolur. Dolayısıyla put yerine patch komutu kullanılarak
        // yalnızca değişen verilerin yer değiştirmesi ve değimeyen verilerin korunması sağlanır.
        const response = await streams.patch(`/streams/${id}` , formValues); 

        dispatch({type:'STREAM_EDIT', payload : response.data});
        history.push('/');
    }
}

export const streamDelete = (id) => {
    return async (dispatch) => {
        await streams.delete(`/streams/${id}`);

        dispatch({type:'STREAM_DELETE', payload : id});
    }
}
