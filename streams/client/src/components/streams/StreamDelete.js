import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import {connect} from 'react-redux';
import {streamFetch, streamDelete} from '../../actions';
import {Link} from 'react-router-dom';


class StreamDelete extends React.Component {
    
    componentDidMount = () => {
        this.props.streamFetch(this.props.match.params.id);
        
        // normalde bu kod bloğu render methodu içerisinde yer alıyordu. Ancak stream in silinmesini müteakip 
        // action içerisinde stream.delete ve history.push komutları sonrasında tekrar streamdelete sınıfının 
        // render metodu çalışıyor ve silinmiş olan userId property si undefined göründüğünden dolayı hata mesajı
        // alıyoruz. Bu nedenle kod bloğu buraya taşınmıştır... Burada başlangıçta userId uyuşmazlığı varsa doğrudan
        // anasayfa ya yönlendirme yapılıyor...
        if( !this.props.auth.userId || !this.props.stream.userId || this.props.auth.userId !== this.props.stream.userId ) {
            history.push('/');
        }
    }

    renderContent = () => {
        if(!this.props.stream){
            return(<div>{`Are you sure you want to delete?`}</div>)
        }
        return(<div>{`Are you sure you want to delete the stream with the title: ${this.props.stream.title}`}</div>)
    }
    
    // actions fonksiyon olarak yazılmadığında =(<div></div>) şeklinde tanımlandığında actions() yerine sadece actions
    // kullanılabilir.
    render() {
        

        return (
            <Modal 
                header='Delete Stream' 
                content={this.renderContent()} 
                actions={this.actions()}
                onDismiss={()=> history.push('/')}
            />
        );
    }

// eğer butonları tek div altında değil de ayrı ayrı göndermek istersek hata mesajı almamak için React.Fragment tagini
// kullanabiliriz. Fragment yerine boş tag ler de kullanlabilirdi ancak bunu bazı code kontrol mekanızmaları hata olarak
// algılayabiliyormuş...
    actions = () => {
        return (
            <React.Fragment>
                <button onClick={() => {this.props.streamDelete(this.props.match.params.id)}} className='ui button negative'>Delete</button>
                <Link to='/' className='ui button'>Cancel</Link>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return ({stream : state.streams[ownProps.match.params.id],
             auth : state.auth});
}
export default connect(mapStateToProps, {streamFetch, streamDelete})(StreamDelete);