import {Link} from 'react-router-dom';
import DifficultySelection from './DifficultySelection'
import React, { useState, useEffect } from 'react';
import Settings from '../Settings/Settings';
import {useNavigate} from "react-router-dom";
import { Button } from '@mui/material';
import '../../styles/Home.css';

export default function Home()
{  
    // three states: audio, order, duration
    const [audio, setAudio] = useState(null);
    const [order, setOrder] = useState(null);
    const [duration, setDuration] = useState(null);


    const [difficulty, setDifficulty] = useState('easy')
    const [timer, setTimer] = useState('off') 
    const [tutorial, setTutorial] = useState('off')
    const [leaderboard, setLeaderboard] = useState('off') 
    const [colorblind_mode, setColorblind_mode] = useState('off')


    // pass three setState to DifficultySelection component
    // Link only avaialable once the order is received, this forces the user to choose the difficulty
    // Link passes three props: tune(blob type), the order, duration
    return(
        <div id='homeContainer'>
            <h1>Welcome to Soundle</h1>
            <h3>Please select a difficulty to play the game!</h3>
            <DifficultySelection 
                SetAudio={setAudio} 
                SetOrder={setOrder}
                SetDuration={setDuration}
            ></DifficultySelection>
           
            <Settings
                set_Difficulty={setDifficulty}
                set_Timer={setTimer}
                set_Tutorial={setTutorial}
                set_Colorblind_mode={setColorblind_mode}
                set_Leaderboard={setLeaderboard}
                showSettings
            ></Settings>

            <Link to={order ? "/game" : "#"} /* onClick={useGetSettings(setSettings)} */ state={{ 
                tune: audio, 
                note_order: order, 
                duration: duration,
                difficulty: difficulty,
                timer:timer,
                tutorial:tutorial,
                leaderboard:leaderboard,
                colorblind_mode:colorblind_mode,
            }}>Play Game</Link>
        </div>
    );
}