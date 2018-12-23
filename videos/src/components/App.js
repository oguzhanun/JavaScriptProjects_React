import React from 'react';
import SearchBar from './SearchBar';
import Youtube from '../apis/Youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';


class App extends React.Component{

    state={videos : [], selectedVideo : null };

    submitTheForm = async (term) => {
       
        const response = await Youtube.get('/search',{
            params:{
                q:term
            }
        });

        this.setState({
            videos:response.data.items,
            selectedVideo:response.data.items[0]
        });
        
        console.log(this.state.videos);

    }

    selectedVideo = (theVideo) =>{

        this.setState({selectedVideo:theVideo});
        console.log(theVideo);
    }

    componentDidMount = () => {
        this.submitTheForm('A Beatiful Mind');
    }

    render(){

        return(
            <div className='ui container'>
                
                <SearchBar onFormSubmitMethod={this.submitTheForm}/>
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail onVideoSelected={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList videos={this.state.videos} onVideoSelect={this.selectedVideo}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;