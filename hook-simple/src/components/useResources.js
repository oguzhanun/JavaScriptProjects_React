import {useState, useEffect} from 'react';
import axios from 'axios';

const useResources = (resource) => {
    
    const [ response, setResponse] = useState( [] );

    const fetchResource = async (resource) => {
        const returning = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);
        setResponse( returning.data );
    }

    // componentDidMount metodu içinde setState metodu çağrıldığından ve setState ile her seferinde yeniden render olan uygulama
    // tekrar componentDidMount metodu çağrıldıından sonsuz döngü oluşuyor. Bunun önlemek için previous props yani prevProps 
    // property sine bakarak değişmenin olduğu yerde metodun çalışmasını sağlamamız gerekiyor...
    // async componentDidUpdate(prevProps){
    //     if(prevProps !== this.props.resource){
    //         await this.componentDidMount();
    //     }
    // }

    // lifecycle metodlarını çağırmakta kullanılıyor. array içindeki değer değişirse ilk argüman olan fonksiyon tekrar çağrılıyor.
    // bir de zaten başlangıçta çağırılıyordu. Yani componentDidMount gibi...
    // useEffect fonksiyonu içinde async await olan bir promise i doğrudan kendi argümanı olarak çağıramıyor. bunun yerine böyle
    // bir ifade varsa kod içinde kodu ayrı bir fonksiyon olarak çağırmak gerekiyor... yani aslındsa useEffect kati bir sonuç bekliyor
    // sorun buradan kaynaklanıyor...
    useEffect( () => {
        fetchResource( resource )

        
        // *** BURADA İLK PARANTEZ İÇİNDEKİ FONKSİYON BİR DEFINITION YANİ BİR TANIMLAMA, İKİNCİ BİR PARANTEZ
        // İLE BU TANIMLADIĞIMIZ BU FONKSİYON ÇALIŞTIRILMIŞ OLUYOR. VE ARGÜMAN OLARAK DA İKİNCİ PARANTEZ 
        // İÇİNDEKİ DEĞİŞKENİ ALARAK ÇALIŞIYOR. YANİ BURADA ASLINDA BİR NEVİ ASYNC OLAN FONKSİYON ÇALIŞTIRILMIŞ
        // HALDE USEEFFECT İÇİNE DAHİL OLUYOR. YANİ HAM HALDE DEĞİL.***

        // (async (resource) => {
        //     const returning = await axios.get(`https://jsonplaceholder.typicode.com/${resource}`);
        //     setResponse( returning.data );
        // })(resource)
        
    }, [ resource ] );

    return response;
}

export default useResources;