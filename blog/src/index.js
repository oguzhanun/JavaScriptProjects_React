import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import App from './components/App';
import thunk from 'redux-thunk';


                // provider ile redux store u oluşturuyoruz. store içine reducer ları yollayarak bir veri deposu
                // oluşturuyoruz. daha sonra veriye ihtiyaç duyduğumuzda depodan çekiyoruz. 
                // Thunk middleware i ile de action creator içinde dispatch metodunu kullanarak
                // async await komutları ile oluşan asenkron requestin babel daki dönüşüm sonrasında meydana gelen
                // obje yerine fonksiyon dönüşü sorununun halledilmesini sağlıyoruz.
ReactDOM.render(
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
        <App />
    </Provider>,
    document.querySelector('#root')
);