import "./SeasonDisplay.css";
import React from 'react';



const getSeason= (lat, month)=>{

    if(month<2 || month>7){
        return lat>0 ? 'winter':'summer';
    } else {
        return lat>0 ? 'summer':'winter'
    }
};


const seasonConfig = {
    summer:{
        text:"Oh! It's so hot. Let's hit the beach.",
        iconName:"sun"
    },
    winter:{
        text:"Burr, It's chilly out there",
        iconName:"snowflake"
    }
};


const SeasonDisplay = (props)=>{

    const season = getSeason(props.lat, props.month);
    //const icon = season === 'winter' ? 'snowflake':'sun';
    const {text, iconName} = seasonConfig[season];

    return (
        <div className={`season-display ${season}`}>
            <i className={`massive ${iconName} icon icon-left`}></i>
            
            <h2>{text}</h2>
            
            <i className={`massive ${iconName} icon icon-right`}></i>
        </div>
    );    
}

export default SeasonDisplay;