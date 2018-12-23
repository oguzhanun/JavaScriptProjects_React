import React from 'react';

class ImageCard extends React.Component{

    constructor(props){
        super(props);

        this.state = {spans:0};

        this.imageRef = React.createRef(); // burada DOM üzerindeki bir elemana doğrudan erişim sağlayabilmek amacıyla
        // createRef() fonksiyonunu kullandık... "ref" property'si ya da attribute ını verdiğimiz tag react in doğrudan
        // eriştiği etiket halini alıyor.
    }

    componentDidMount (){
        
       this.imageRef.current.addEventListener('load',this.setSpans);
        
        //console.log(this.imageRef);
        //console.log(this.imageRef.current.clientHeight);
    }

    setSpans = () => {
        
        const heigth = this.imageRef.current.clientHeight;

        const spanN = Math.ceil(heigth/10);

        this.setState({spans:spanN});
    }

    render(){

        //const {description, urls} = this.props.image;

        //burada doğrudan react in erişim sağladığı etiket ref attribute una sahip img etiketi...
        return(
            <div style={{gridRowEnd:`span ${this.state.spans}`}} >
                <img ref={this.imageRef} alt={this.props.imageSend.description} src={this.props.imageSend.urls.regular} />
            </div>
        );
    }


}

export default ImageCard;