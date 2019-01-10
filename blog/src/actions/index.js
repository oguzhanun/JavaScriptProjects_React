import JsonPlaceholder from '../apis/JsonPlaceholder';
import _ from 'lodash';


export const fetchPostsAndUser = () => async (dispatch, getState) =>{

    // fetchPosts fonksiyonu async bir fonksiyon olduğundan dolayı buradaki 
    // await özel terimi fonksiyonun dispatch edilmesi için bekleme yapmak zorunda
    // yani async bir işleme bağlı başka bir işlem de otomatik olarak async olacaktır.
    // bu nedenle burada da await özel komutunu kullanmamız gerekmektedir.
    await dispatch( fetchPosts() );

    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    
    console.log('Kullanıcı adları burada: ',userIds); // kullanıcı adaları unique olanların _.map fonksiyonu ile
                                                      // süzülmüş hali buradan incelenebilir.

    userIds.forEach(id => {dispatch(fetchUser(id))}); // burada kullanıcı isimleri fetch ediliyor. sonrasında reducer
                                                      // içindeki user a dispatch ediliyor. bu sayede userHeader
                                                      // içinde artık bir action creator çağırmanın anlamıda kalmıyor.
                                                      // dolayısıyla artık userHeader kompanenti içinde artık bir 
                                                      // actioncreator invoke etmenin de gereği yok.
                                                      
                                                      // burada neden await komutunun beklenmediği konusunu tam olarak
                                                      // anlamadım. ama zaten forEach fonksiyonu ile birlikte kullanılamıyor
                                                      // zaten. İlla da kullanmak gerekirse yapılması gereken map
                                                      // fonksiyonunun kullanılması veya Promis.all() diye bir fonksiyon
                                                      // ile map fonksiyonunun sarılması gerekebileceğini gösterdi.
                                                      
                                                      // anladığım kadarıyla veri doğrudan kullanılmıyor ve başka bir 
                                                      // kaynakta işleme yapılmadığından zamanlama konusunda bir sorunun
                                                      // var olmaması burada etkin sanırsam...???_?_?_?_?_?_?_?_?_?
                                                    
}


export const fetchPosts = () => async dispatch => {
        const response = await JsonPlaceholder.get('/posts');

        dispatch ({
            type : 'FETCH_POSTS',
            payload: response.data
        });
    };


    // Burada herbir userId girdisi için bir kullanıcı ismi çıktısı verilmektedir. 
    // aynı userId için 10 defa network request işlemi yapılmaktadır. Bu da gereksiz ve
    // browser ı yoran ve uygulamayı yavaşlatan bir işlemdir. bu nedenle _.memoize fonksiyonu
    // lodash kütüphanesinden alınarak kullanılmaktadır. bunun da örneği bir sonraki fonksiyon 
    // bloğunda yer almaktadır.

 export const fetchUser =  userId => async dispatch  => {
    const response = await JsonPlaceholder.get(`/users/${userId}`);

    dispatch ({
        type : 'FETCH_USER',
        payload: response.data
    });
};


//*-*-*-*-*-*-*-*-*-*-   MEMOIZE FONKSİYON BLOĞU  -*-*-*-*-*-*-*-*-*-*-*-*-**-*
// export const fetchUser =  userId => dispatch => { 
 
//     _fetchUser(userId,dispatch);

    
// };

//*-*-*-*-*-*-*-*-*-*-   MEMOIZE FONKSİYON BLOĞU (DEVAMI)  -*-*-*-*-*-*-*-*-*-*-*-*-**-*
// const _fetchUser = _.memoize( async (userId, dispatch) => {
//         const response = await JsonPlaceholder.get(`/users/${userId}`);

//         dispatch ({
//             type : 'FETCH_USER',
//             payload: response.data
//         });
//     });

