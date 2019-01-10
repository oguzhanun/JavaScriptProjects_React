import React from 'react';
import {fetchUser} from '../actions';
import {connect} from 'react-redux';


// let i = 0; // i değişkenini componentdidmount içinde userId sayacını kontrol eden mekanizma olarak kullanıyoruz ki
            // bu sayede tekrar eden network request leri önleyebilelim.

class UserHeader extends React.Component{

    state = {userIdInMemory : 0}; // setState  async bir komut olması nedeniyle, ki o da browser ın her gelen setState
                                  // komutu ile şişmesini önlemek içinmiş, bir sayaç gibi istenen zamanda gereken değeri
                                  // sağlayamıyoruz...

    componentDidMount = async ()=> {
       
        //console.log('userIdInMemory: ',this.state.userIdInMemory);

        //if( i !== this.props.userId){
           
            //await this.setState({userIdInMemory:this.props.userId}, 
           //     () =>{this.setState({userIdInMemory: this.props.userId})});
           //this.componentDidUpdate(); 
           
           // i = i +1;
           
           // bu komut actions klasörü içindeki index dosyasında zaten post lar ile birlikte fetch edildiğinden
           // ikinci kez burada bir başka fetch işleminin yapılması anlamsız hale geliyor.
           // yani bu sayede this.posts.user ile eriştiğimiz kullanıcı ismi zaten elimizde var olmuş durumdadır.

           // this.props.fetchUser(this.props.userId);

           
       // }

        //console.log('userId : ', this.props.userId);
        //console.log('i : ',i);
    }
    
    
    render(){
        // const usr = this.props.user.find(user => user.id === this.props.userId); // bu çağrı her render sonrasında
                                                                                    // sonrasında yapılmak zorunda değil.
                                                                                    // bunun yerine mapStateToProps içinde
                                                                                    // yapılması daha makul..
        const usr = this.props.user;

        //console.log('burası yuzır kısmı: ', usr);   // console çıktısı bize aynı user ismi için 10 defa request te bulunduğumuz
                                                    // gösteriyor.

        //this.setState({userIdInMemory:this.props.userId});

        if(!usr){
            return null;
        }
        return(
            <div className='header'>{usr.name}</div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {user : state.user.find(user =>{return user.id === ownProps.userId})}; // ownProps değişkeni UserHeader sınıfı
                                                                                  // dışında iken de atadan gelen property
                                                                                  // yi sınıf dışına ama sayfa içine aktarmaya
                                                                                  // yarıyor...
}

export default connect(mapStateToProps, {fetchUser})(UserHeader);