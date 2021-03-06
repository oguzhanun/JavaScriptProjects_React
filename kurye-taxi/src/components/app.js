import React from 'react';
import MapBoxGL from 'mapbox-gl';
import '../css/app.css';
import axios from 'axios';

class App extends React.Component
{
    constructor (){
        super();
        this.state = {lat : null, long : null, errorMessage:"", route:[]};
        this.map = null;
    }

    componentDidMount = () =>
    {
        this.getPositionRouteAndMap();
    }

    getPositionRouteAndMap = () =>{
        navigator.geolocation.getCurrentPosition(
            ((position)=> {

                this.setState({lat : position.coords.latitude, long : position.coords.longitude});
                console.log("latitude : ", this.state.lat, "longitude : ", this.state.long)                
                MapBoxGL.accessToken = 'pk.eyJ1Ijoib2d1emhhbnVuIiwiYSI6ImNqeWZpMzJoczFjYmEzbHFvbjBhYnY4OTcifQ.F4h0g13T6AQ0UllT9Oe3CQ';
        
                this.map = new MapBoxGL.Map({
                    container : 'map',
                    style : 'mapbox://styles/mapbox/streets-v11',
                    center : [this.state.long, this.state.lat], //önce longitude sonra latitude
                    zoom : 14
                });

                // getRoute fonksiyonuna varış noktasının bilgisinin girilmesi gerekiyor...    
                this.getRoute([36.314746, 41.317419]);
            }),
            (err) => this.setState({errorMessage : err.message})
        );
    }

    // end değişkeni varılmak istenen nokta olacak...
    getRoute = (end) => 
    {   
        const start = [this.state.long, this.state.lat];
        const url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' +
                    start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] +
                    '?steps=true&geometries=geojson&access_token=' + 
                    MapBoxGL.accessToken;
        axios.get(url).then(response=>
            {
                this.setState({route : response.data.routes[0].geometry.coordinates});
                const route = response.data.routes[0].geometry.coordinates;
                this.setState(route);

                if(this.map){
                    // haritada kullanıcının konumunu belirten bir pulsing dot oluşturulacak...
                    this.showDriverPosition(start);
                    console.log("showDriver geçti...")
        
                    this.map.on('load', ()=>
                    {
                        // iki nokta arasını çizerek haritaya ekliyoruz.
                        //if(this.route)
                        this.map.addLayer(
                        {
                            "id": "route",
                            "type": "line",
                            "source": {
                                "type": "geojson",
                                "data": {
                                    "type": "Feature",
                                    "properties": {},
                                    "geometry": {
                                        "type": "LineString",
                                        "coordinates": route
                                    }
                                }
                            },
                            "layout": {
                            "line-join": "round",
                            "line-cap": "round"
                            },
                            "paint": {
                            "line-color": "#888",
                            "line-width": 6
                            }
                        })
                    })
                }

            }).catch(err=>
                {
                    console.log(err);
                })
    }

    showDriverPosition (start){
        var .imap = this.map;
        if(map)
        map.on('load', ()=>{
            var size = 200;

            var pulsingDot = {
                width : size,
                height : size,
                data : new Uint8Array(size * size * 4),
                
                onAdd : function(){
                    var canvas = document.createElement('canvas');
                    canvas.width = this.width;
                    canvas.height = this.width;
                    this.context = canvas.getContext('2d');
                },
                
                render : function (){
                    var duration = 1000;
                    var t = (performance.now()%duration)*duration;
                    var radius = size / 2 * 0.3;
                    var outerRadius = size / 2 * 0.7 * t + radius;
                    var context = this.context;
                    
                    // draw outer circle
                    context.clearRect(0, 0, this.width, this.height);
                    context.beginPath();
                    context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
                    context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
                    context.fill();
                    
                    // draw inner circle
                    context.beginPath();
                    context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
                    context.fillStyle = 'rgba(255, 100, 100, 1)';
                    context.strokeStyle = 'white';
                    context.lineWidth = 2 + 4 * (1 - t);
                    context.fill();
                    context.stroke();
                    
                    // update this image's data with data from the canvas
                    this.data = context.getImageData(0, 0, 200, 200).data;
                    
                    // keep the map repainting
                    
                    map.triggerRepaint();
                    
                    // return `true` to let the map know that the image was updated
                    return true;
                }
            }
            
            map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
            
            console.log('merhaba'); 
            
            if(!map.getLayer('points'))
            map.addLayer(
            {
                "id": "points",
                "type": "symbol",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "FeatureCollection",
                        "features": 
                        [{
                            "type": "Feature",
                            "geometry": 
                            {
                                "type": "Point",
                                "coordinates": start
                            }
                        }]
                    }
                },
                "layout": 
                {
                    "icon-image": "pulsing-dot"
                }
            });

            setInterval(  () =>  {map.getSource('points').setData( {
                            "type": "FeatureCollection",
                            "features": 
                            [{
                                "type": "Feature",
                                "geometry": 
                                {
                                    "type": "Point",
                                    "coordinates": start
                                }
                            }]
                        }
                    );
                    i = i + 0.001;
                    start[0] = start[0]+i;
                    start[1] = start[1]+i;
                },1000
            ) 
        });
    }

    updateDriverPosition = () =>{
        navigator.geolocation.getCurrentPosition((position)=>
        {
            i = i + 0.01;
            //console.log("i = ",i);

            this.showDriverPosition([position.coords.longitude+i, position.coords.latitude+i])
        }, (err)=>
        {
            console.log(err);
        })
    }

    render ()
    {   
        return(
            <div>
                <div id='map'>Hello World</div>
            </div>
        );
    }
}

var i = 0.01;

export default App;      