import {Link} from 'react-router-dom';
import DifficultySelection from './DifficultySelection'
import React, { useState, useEffect } from 'react';
import Settings from '../Settings/Settings';
import '../../styles/Home.css';
import FadeIn from 'react-fade-in';

export default function Home()
{  
    // three states: audio, order, duration
    const [audio, setAudio] = useState(null);
    const [order, setOrder] = useState(null);
    const [duration, setDuration] = useState(null);
    const [instrument, setInstrument] = useState("piano");

    const [familiar, setFamiliar] = useState(0);

    const [difficulty, setDifficulty] = useState("beginner");
    const [tutorial, setTutorial] = useState('off')
    const [leaderboard, setLeaderboard] = useState('on') 
    const [colorblind_mode, setColorblind_mode] = useState('off')

    const [daily_challenge, setDaily_Challenge] = useState(0);

    // pass three setState to DifficultySelection component
    // this variable soley works for unit test
    const showSettings = false;

    // Link only avaialable once the order is received, this forces the user to choose the difficulty
    // Link passes three props: tune(blob type), the order, duration
    return(
        <div id='homeContainer'>
            <h1>🌴🌳 Welcome to Soundle 🌳🌴</h1>
            <h3>🌲 Select a difficulty to get started! 🌲</h3>
            <FadeIn>
            <DifficultySelection 
                SetAudio={setAudio} 
                SetOrder={setOrder}
                SetDuration={setDuration}
                SetDifficulty={setDifficulty}
                SetInstrument={setInstrument}
                Instrument={instrument}
                Familiar={familiar}
                DailyChallenge = {daily_challenge}
            ></DifficultySelection>
           
            <Settings
                set_Tutorial={setTutorial}
                set_Colorblind_mode={setColorblind_mode}
                set_Leaderboard={setLeaderboard}
                SetInstrument={setInstrument}
                SetFamiliar={setFamiliar}
                SetDailyChallenge={setDaily_Challenge}
                showSettings={showSettings}
            ></Settings>

            <Link to={order ? "/game" : "#"} /* onClick={useGetSettings(setSettings)} */ state={{ 
                tune: audio, 
                note_order: order, 
                duration: duration,
                difficulty: difficulty,
                instrument: instrument,
                familiar:familiar,
                tutorial:tutorial,
                leaderboard:leaderboard,
                colorblind_mode:colorblind_mode,
            }}>🐼Play Game!🐵</Link>
            </FadeIn>
        </div>
        
    );
}