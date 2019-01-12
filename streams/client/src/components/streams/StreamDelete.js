import React from 'react';
import Modal from '../Modal';
import history from '../../history';


const StreamDelete = () => {
    
    // actions fonksiyon olarak yazılmadığında =(<div></div>) şeklinde tanımlandığında actions() yerine sadece actions
    // kullanılabilir.
    return (
        <div>StreamDelete

            <Modal 
                header='Delete Stream' 
                content='Are you sure you want to delete?' 
                actions={actions()}
                onDismiss={()=> history.push('/')}/>
        </div>
    );
}

// eğer butonları tek div altında değil de ayrı ayrı göndermek istersek hata mesajı almamak için React.Fragment tagini
// kullanabiliriz. Fragment yerine boş tag ler de kullanlabilirdi ancak bunu bazı code kontrol mekanızmaları hata olarak
// algılayabiliyormuş...
const actions = () => {
    return (
        <React.Fragment>
            <button className='ui button negative'>Delete</button>
            <button className='ui button'>Cancel</button>
        </React.Fragment>
    );
}

export default StreamDelete;