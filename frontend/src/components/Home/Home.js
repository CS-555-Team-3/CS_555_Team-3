import {Link} from 'react-router-dom';
import DifficultySelection from './DifficultySelection'
import React, { useState, useEffect } from 'react';

export default function Home()
{  
    // three states: audio, order, duration
    const [audio, setAudio] = useState(null);
    const [order, setOrder] = useState(null);
    const [duration, setDuration] = useState(null);

    // pass three setState to DifficultySelection component
    // Link only avaialable once the order is received, this forces the user to choose the difficulty
    // Link passes three props: tune(blob type), the order, duration
    return(
        <>
            <h3>Please select a difficulty to play the game!</h3>
            <DifficultySelection 
                SetAudio={setAudio} 
                SetOrder={setOrder}
                SetDuration={setDuration}
            ></DifficultySelection>
            <Link to={order ? "/game" : "#"} state={{ 
                tune: audio, 
                note_order: order, 
                duration: duration
            }}>Play Game</Link>
        </>
    );
}