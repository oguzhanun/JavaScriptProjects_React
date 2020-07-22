import React from "react"

    var x = 5;

console.log(x+5)

class App extends React.Component  {

    state = {music : ""}
    
    i = {};    

    render = () => {
        console.log(x)

        return(
            <div >
                <div style={{ position:"relative"}}>
                    <img style={{width:"100%", height:"100%"}} src="./pictures/Desktop_Wallpaper_01.jpg" alt="wallpaper"/>
                    <button onClick={()=> this.oynat("heyThere")} style={{height:"50px",width:"50px",position:"absolute",backgroundColor:"black", color:"white", left:`${window.innerWidth/2-250}px`, top:`${window.innerHeight/2}px`}}> HEY </button>
                    <button onClick={()=> this.oynat("IM")} style={{height:"50px",width:"50px",position:"absolute",backgroundColor:"black", color:"white", left:`${window.innerWidth/2-150}px`, top:`${window.innerHeight/2}px`}}> I'M</button>
                    <button onClick={()=> this.oynat("Using")} style={{height:"50px",width:"50px",position:"absolute",backgroundColor:"black", color:"white", left:`${window.innerWidth/2-50}px`, top:`${window.innerHeight/2}px`}}> USING</button>
                    <button onClick={()=> this.oynat("Chats")} style={{height:"50px",width:"50px",position:"absolute",backgroundColor:"black", color:"white", left:`${window.innerWidth/2+50}px`, top:`${window.innerHeight/2}px`}}> CHATS</button>
                    <button onClick={()=> this.oynat("App")} style={{height:"50px",width:"50px",position:"absolute",backgroundColor:"black", color:"white", left:`${window.innerWidth/2+150}px`, top:`${window.innerHeight/2}px`}}> APP</button>
                    
                </div>
                <audio ref="audio" >
                    <source src={`./audio/${this.state.music}.mp3`}/>
                </audio>
            </div>
        )
    }

    
    oynat = async (name) => {
        await this.setState({music:name})

        try {
            await this.refs.audio.load()
            await this.refs.audio.play()
        } catch(e) {
            console.log(e)

        }
    
    }
}


export default App