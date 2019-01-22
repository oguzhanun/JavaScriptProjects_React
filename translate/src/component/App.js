import React from 'react';
import UserHeader from './UserHeader';
import LanguageContext, { LanguageLogic } from '../contexts/LanguageContext';
import ColorContext from '../contexts/ColorContext';
import LanguageSelector from './LanguageSelector';

class App extends React.Component {
    
    render(){
        return(
            <div className='ui container'>
            {/* Yalnızca burada en kapsayıcı kompanent olarak diğer noktalardan farklı olarak yalnızca burada LanguageLogic bir 
                store olarak kullanılıyor. diğer daha alt elemanlarda languagecontext kullanılıyor. Veri çekme işi doğrudan context
                üzerinden gerçekleşiyor. languagelogic aslında languagestore olacaktı. asıl kullanım amacı redux store un 
                yerini tutmak*/}
            <LanguageLogic>
                <LanguageSelector/>
                <ColorContext.Provider value={'red'}>
                    
                        <UserHeader />
                    
                </ColorContext.Provider>
            </LanguageLogic>
            </div>
        );
    }
}

export default App;