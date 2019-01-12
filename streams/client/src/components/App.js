import React from 'react';

// Burada başlangıçta BrowserRouter kompanenti kullanılıyordu. Ancak daha sonra programatik olarak 
// url history sini kontrol etmek istediğimiz için router a history attribute ını eklememiz gerektiğinden
// ve BrowserRouter bunu kabul etmediğinden Router kompanentini kullanıyoruz...
// Link komponent i anchor tag <a> yerine kullanılıyor.
import {Router, Route} from 'react-router-dom';  //Link kompanenti buraya girecek...

import StreamCreate from './streams/StreamCreate';
import StreamList from './streams/StreamList';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';

/*
const PageOne = () => {

    // Link kompanent i de aslında bir anchor etiketi oluşturuyor. Ancak <a> etiketi kullandığımızda
    // mevcut bulunduğumuz sayfa önce index.html sayfasına gidiyor sonra kayıtlı verileri tamamen temizliyor
    // ve ancak ondan sonra yeni sayfaya yönleniyor. Bu şekilde yapılan trafikte tutulması gereken veri
    // kaybolmuş oluyor. Bu istenmeyen bir durum. Dolayısıyla react-router-dom ile sayfalar arasında History
    // kompanenti sayesinde veri kaybı ve ekstra gezinme gerçekleşmeden hedef sayfaya ulaşılıyor.
    return(
        <div>PageOne
            <div><button><Link to='/pagetwo'>Click Me To Change PageTwo</Link></button></div>
        </div>
    );
}

const PageTwo = () => {
    return (
        <div>PageTwo
            <br/>
            <button><Link to='/'>Click Me To Change PageOne</Link></button>
        </div>
    );
}
*/



const App = () => {


    // eğer kompanentteki attribute yalnızca ismi ile var ve eşitlik hiç yok ise bu o attribute ın "={true}"
    // eşitliğine sahip olduğunu gösteriyor. Yani "exact" attribute ı "exact={true}" olarak işlem görür...
    // exact attribute ı path değerinin tam olarak eşleşmesi gerektiğini ifade etmektedir. bu path i içeren
    // url ler işlem görmez bu sayede. Aksi takdirde exact kullanılmaz ise pagetwo url si içinde slash da olduğundan
    // iki kompanent te birlikte render olur.
    return(
        <div className='ui container'>

            {/*history attribute ı sayfalar arasında programatik olarak gezinmeyi sağlıyor. diğer 
            gezinme yöntemi ise intentional navigation adıyla anılıyor... doğrudan link tag i 
            ile yönlendirme sağlanıyor. */}
            <Router history={history}>
                <div>
                    <Header/>
                    <Route path='/' exact component={StreamList}></Route>
                    <Route path='/streams/new' component={StreamCreate}></Route>

                    {/* iki nokta üst üste den sonrası url de gidilmesi gereken adresi etkilemiyor. : den sonra 
                    yazılanlar o sayfaya değişken olarak girdi yapılabilecek veriyi içeriyor. */}
                    <Route path='/streams/edit/:id' exact component={StreamEdit}></Route>
                    <Route path='/streams/show/:id' component={StreamShow}></Route>
                    <Route path='/streams/delete' exact component={StreamDelete}></Route>
                </div>
            </Router>
        </div>
    );
}

export default App;