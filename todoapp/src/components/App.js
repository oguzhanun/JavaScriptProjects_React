import React from 'react';
import Axios from 'axios';


class App extends React.Component
{
    constructor(props)
    {
        super(props);
        //err:"" ile null arasında bir fark olmuyor. İkisi de if statement içinde aynı sonucu veriyor.
        this.state={isimler: null, err: ""};
    }

    componentDidMount()
    {
        Axios.get('http://localhost:8080/isimler').then(response=>
        {
            console.log(response);
            this.setState({isimler:response.data});

        }).catch(err=>
            {
                console.log(err);
                this.setState({err});
            })
    }

    isimleriAyir = () =>
    {
        if(this.state.isimler){
            console.log(this.state.isimler, 'isimler bunlar')
            const ayrikIsimler = this.state.isimler.map(isim=>
                {
                    return (
                        <div key={isim}>
                            <br></br>
                            {isim} 
                            <hr></hr>
                        </div>)
                })
            return ayrikIsimler;
        }   
    }

    render()
    {   
        if(this.state.err)
        {
            return (
                <div>Error: {this.state.err}</div>
            )
        }    
        return (
            <div>{this.isimleriAyir()}</div>
        );
    }
}

export default App;