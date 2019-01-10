import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';


class GoogleAuth extends React.Component{


    //state = {isSignedIn : null}; //state den redux store a geçiş yaptığımdan gerek kalmadı.

    componentDidMount = () => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({clientId:'144903501323-4rb0njukp8i6t9psgr1gd5a0tj4lqbil.apps.googleusercontent.com',
                                     scope:'email'      
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                
                //this.setState({isSignedIn : this.auth.isSignedIn.get()});     // state den redux store a geçiş yaptığımdan gerek kalmadı...
                
                this.onAuthChange(this.auth.isSignedIn.get());

                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        });
    }

    // bu method a dışardan saklı olarak bir argüman girmektedir. O da boolean bir değerdir. kullanıcının
    // giriş yapıp yapmadığının sinyalini üretir.
    onAuthChange = (isSignedIn) => {
        // this.setState({isSignedIn:this.auth.isSignedIn.get()}); // burada başlangıçta action kullanmadan
                                                                   // state ile google kütüphanesi yardımı ile
                                                                   // giriş yapılmış olup olmadığının tespiti 
                                                                   // sağlanıyordu. isSignedIn metod argümanına
                                                                   // bu sayede ihtiyaç yoktu. Ancak action kullanınca
                                                                   // ihtiyaç olacak...

        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId()); // getId() metodu yerine ".w3.U3" yazarsak email
                                                                    // adresini alıyoruz. ".w3.ig" yazarsak da ismi alıyoruz. 
        }else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderSignStatus = () => {

        if(this.props.isSignedIn === null){
            return null;
        } else if(this.props.isSignedIn === true){
            return (
                <div>
                    <button onClick={this.onSignOutClick} className='ui red google button'>
                        <i className='google icon'></i>
                        Sign Out <br/>
                        Mr. or Mrs.<br/>      
                        {this.props.userId}
                    </button>
                </div>
            );
        } 

        return (
            <div>
                <button onClick={this.onSignInClick} className='ui red google button'>
                        <i className='google icon'></i>
                        Sign In with Google
                        {this.props.userId}
                </button>
            </div>
        ); 

    }

    render(){

        return(
            <div>{this.renderSignStatus()}</div>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        isSignedIn : state.auth.isSignedIn,
        userId : state.auth.userId
    }
}

export default connect(mapStateToProps, {signIn, signOut} )(GoogleAuth);