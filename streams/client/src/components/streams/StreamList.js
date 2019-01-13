import React from 'react';
import {connect} from 'react-redux';
import {streamsFetch} from '../../actions';
import {Link} from 'react-router-dom';


class StreamList extends React.Component {


    componentDidMount(){
        this.props.streamsFetch();
    }

    renderCreateButton = () => {
        if(this.props.isSignedIn){
            return (
                <div style={{textAlign : 'right', marginTop : 10 }}>
                    <Link to='/streams/new' className='ui button primary'>Create Stream</Link>
                </div>
            );
        }
    }

    renderAdmin = (stream) =>{

        if(this.props.currentUserId === stream.userId && 
                        stream.userId !== null && 
                            stream.userId !== undefined){
            return(
                <div className='right floated content'>
                    {/*back tack ile karşık syntax te yazabiliyoruz. */}
                    <Link to={`streams/edit/${stream.id}`} className='ui button primary'>
                        Edit
                    </Link>
                    <Link to={`streams/delete/${stream.id}`} className='ui button negative'>
                        Delete
                    </Link>
                </div>
            );
        } else return null;
    }

    renderList = () => {
        
        return(
            this.props.streams.map( stream => {
                return(
                    <div className='item' key={stream.id}>
                        {this.renderAdmin(stream)}
                        <i className='large middle aligned icon video'></i>
                        <div className='content'>
                            <Link to={`/streams/${stream.id}`}>
                                {stream.title}
                            </Link>
                            <div className='description'>{stream.description}</div>
                        </div>
                    </div>
                )
            }
            )
        )
    }

    render(){
        return (
            <div className='ui celled list'>
                <h2>Streams</h2>
                {this.renderList()}
                {this.renderCreateButton()}
            </div>
        );
    }
}


const mapStateToProps = (state) => {

    // Object.values() metodu nesne içindeki değeri bize geri döndürür. Burada geri dönen sonuç 
    // yaptığımız kayıtlar reducer a girerken ekstradan id değerlerine eşitlenerek kaydedilmişti.
    // yani esas obje aynen alınarak objenin içinden bir veri alanına bağlanarak tekrar baştan 
    // oluşturulmuştu. şimdi bu durumu tersine çevirerek esas veriye erişmek istiyoruz...
    return ( { streams : Object.values( state.streams ),
               currentUserId : state.auth.userId,
               isSignedIn : state.auth.isSignedIn
             }
    ) 
    
}

export default connect (mapStateToProps, {streamsFetch})(StreamList);