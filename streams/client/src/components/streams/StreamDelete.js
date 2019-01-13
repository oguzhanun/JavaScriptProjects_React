import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import {connect} from 'react-redux';
import {streamFetch} from '../../actions';


class StreamDelete extends React.Component {
    
    componentDidMount = () => {
        this.props.streamFetch(this.props.match.params.id);
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
        if( !this.props.auth.userId || !this.props.stream.userId || this.props.auth.userId !== this.props.stream.userId ) {
            return (null);
        }

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
                <button className='ui button negative'>Delete</button>
                <button className='ui button'>Cancel</button>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return ({stream : state.streams[ownProps.match.params.id],
             auth : state.auth});
}
export default connect(mapStateToProps, {streamFetch})(StreamDelete);