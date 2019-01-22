import React from 'react';
import {connect} from 'react-redux';
import {streamFetch} from '../../actions';
import flv from 'flv.js';

class StreamShow extends React.Component {

    constructor (props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount(){

        this.props.streamFetch(this.props.match.params.id);
        this.buildPlayer();
    }

    // componentdidmount yalnızca bir kez çalışıyor ve orada çağrılan async streamFetch komutu beklenenden geç bir
    // zamanda sonuçlanabilir ve bu sırada buildplayer kod bloğu çalıştırılırken stream uygun olmadığında video
    // tag i de çalışmayacağından videoRef i oluşturamayabiliriz ve yine hata alırız. bunu önlemek için componentDidUpdate
    // çalıştığında tekrar buildPlayer kodunu çalıştırıyoruz. Eğer this.player hali hazırda varsa kod bloğu çalıştırıl
    // mayacak. Çünkü varsa buildPlayer içinde öncelikle if ifadesi ile this.player ın varlığı return olmayı gerektiriyor.
    componentDidUpdate(){
        this.buildPlayer();
    }

    buildPlayer(){

        // doesStreamExist metodu ile artık if bloğunun stream i çek eden kısmına gerek kalmadı...
        if(this.player || !this.props.stream){
            return;
        }
            this.player = flv.createPlayer({
                type:'flv',
                url:`http://localhost:8000/live/${this.props.match.params.id}.flv`
            });
            this.player.attachMediaElement(this.videoRef.current);
            this.player.load();
    }

    componentWillUnmount(){
        console.log('hi there');
        this.player.destroy();
    }

    doesStreamExist(){
        if(!this.props.stream){
            return (
                <div>
                    <h5>Loading...</h5>
                </div>
            );
        }
         return(
            <div>
                <h2>{this.props.stream.title}</h2>
                <h4>{this.props.stream.description}</h4>
            </div>
        );
    }
    render(){
       
//        const {title, description} = this.props.stream;

        return (
            <div>
                <video ref={this.videoRef} controls style={{width:'100%'}}/>
                <br/>
                {this.doesStreamExist()}
                
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return(
        {
            stream : state.streams[ownProps.match.params.id]
        }
    );
}

export default connect(mapStateToProps, {streamFetch})(StreamShow);