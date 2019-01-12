import React from 'react';
import {connect} from 'react-redux';
import {streamFetch, streamEdit} from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

let id  = null;

class StreamEdit extends React.Component {

     

    componentDidMount(){
        id = this.props.match.params.id;
        this.props.streamFetch(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        //console.log('FORM DEĞERLERİ : ', formValues);
        this.props.streamEdit(this.props.match.params.id , formValues);
    }

    render = () => {
        //console.log('StreamEdit : ', this.props);
        console.log(id);
        console.log(this.props.auth['userId']); //.userId dediğimde userId objesini alamıyorum. ama dizilerde olduğu
                                             // gibi [] syntax ini kullanırsam değere ulaşabiliyorum. çok ilginç ?_?_?_?_?_?
                                             // BAŞLANGIÇTA ÜSTTE YAZDIĞIM GİBİYDİ ŞİMDİ NORMALE DÖNDÜ OLAY. NASIL OLDU ANLAMADIM...
                                             // AMA ŞÖYLE BİR ŞEY VAR Kİ O DA ŞU: KOMUT İKİ KEZ ÇAĞRILIYOR İLKİNDE NULL SONRA DEĞER
                                             // DÖNÜYOR. AMA DİĞER TÜRLÜ DİREK TEK ÇAĞRIDA KOMUT ÇALIŞIYORDU... İLGİNÇ... ŞİMDİ O DA AYNI...
        if(!this.props.stream || ( this.props.auth.userId !== this.props.stream.userId ) ) {
            return(null);
        }
        
        return (
            <div>
                <h3>Edit a Stream</h3>

                {/** Burada initialValues attribute ı ile StreamForm kompanentine aktarınan objenin herbir verisinin
                     kullanılması bazı backend server lar için uygun olmadığı için yalnızca değişecek veri hanelerinin
                     alt kompanente iletilmesi daha doğru bir yaklaşımdır. Bunun için de lodash ten çekebileceğimiz
                     metodlar mevcuttur. _.pick(obje, 'obje eleman adı', 'obje eleman adı', 'obje eleman adı')*/}
                <StreamForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.stream, 'title', 'description')}/> 
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {

    // doğrudan burada verinin erişimi doğru bir yaklaşım değil. Bunun yerine
    // herbir kompanentin bir diğerinden bağımsız olabilmesi için verinin tekrar çekilmesi
    // icap etmektedir. Aksi takdirde refresh veya doğrudan linke gelindiğinde, gezinme yolu ile reducer da depo 
    // edilen ve bu sayfaya da taşınan veri yerine undifined bir veriye erişilir ve bu sayfada istenen şeyin
    // görünmesine engel olur. 
    // *** Bir kural olarak her zaman herbir kompanent diğerinden bağımsız bir şekilde tasarlanmalı ve kendi verisini
    // kendisinin oluşturmasına özen gösterilmelidir. ***
    return ( { stream : state.streams[ownProps.match.params.id],
                auth : state.auth } )
}

//streamUserId : state.streams[ownProps.match.params.id.userId]

export default connect(mapStateToProps, {streamFetch, streamEdit})(StreamEdit);