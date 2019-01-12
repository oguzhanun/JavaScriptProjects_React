import React from 'react';
import SearchBar from './SearchBar';
import unsplash from '../api/unsplash';
import ImageList from './ImageList';


class App extends React.Component {

    state = {images:[]};

    onSearchBarSubmit = async (term)=>{
        
        const response = await unsplash.get('/search/photos',
            {
                params:{query:term}
            }
        );
        //then komutu ile async bir network isteğinin geri dönüşünü alabiliyoruz.
        /*.then(response =>{
            console.log(response.data.results);
        }); */
        
        console.log('the term is =  '+term);
        this.setState({images:response.data.results});

        
    }

    // onMySubmit property si ile SearchBar componentine bir argüman giriliyor gibi görünse de
    // aslında property ye eşitlenen bir fonksiyon ve bu fonksiyon SearchBar component inde çağrıldığında bir nevi
    // loop içinde fonksiyona girilen değer child dan parent a geliyor.
    render(){
        return (
            <div className="ui container" style={{marginTop:'10px'}}>
                <SearchBar onMySubmit={(e)=> this.onSearchBarSubmit(e)}/>  
                <ImageList images={this.state.images}/>
            </div>
        );
    }
}

export default App;



/*
* New minor version of npm available! 6.4.1 → 6.5.0       │
   │   Changelog: https://github.com/npm/cli/releases/tag/v6.5.0   │
   │               Run npm install -g npm to update!   
 */