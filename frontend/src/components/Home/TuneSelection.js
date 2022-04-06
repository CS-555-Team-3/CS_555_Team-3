import Select from 'react-select'
import axios from 'axios';
import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import difficulty_map from '../../config/DifficultyMap.json';
import '../../styles/Home.css';

export default function TuneSelection({SetAudio, SetOrder, SetDuration, SetDifficulty, SetInstrument})
{  
    // three states: difficulty, audio, order
    const [difficulty, setDifficulty] = useState(null);
    const [audio, setAudio] = useState(null);
    const [order, setOrder] = useState(null);
    const [instrument, setInstrument] = useState(null);
    

    // once the user choose difficulty, send the request to backend
    useEffect(() => {
        if (difficulty) {
            // set the parent duration statese accoring to the difficulty_map
            SetDuration(difficulty_map[difficulty][1])
            getSounds(difficulty_map[difficulty][0], (difficulty_map[difficulty][1]).toFixed(1))
        }
      }, [difficulty]);

    
    // once the system receives the tune from the backend, send the request to get the order
    useEffect(() => {
        if (audio) {
            getOrder()
        }
    }, [audio]);

    // for debugging: once the system receives the order, print it out in console
    useEffect(() => {
        if (order) {
            console.log(order)
            
        }
    }, [order]);

    
    // difficulty selection options
    const difficulty_options = [
        { value: 'beginner', label: 'Beginner' },
        { value: 'advanced', label: 'Advanced' },
        { value: 'expert', label: 'Expert' }
    ]

     // instrument selection options
     const instrument_options = [
        { value: 'piano', label: 'Pinao' },
        { value: 'guitar', label: 'Guitar' },
        { value: 'viola', label: 'Viola' },
        { value: 'oboe', label: 'Oboe' },
        { value: 'mandolin', label: 'Mandolin' },
        { value: 'flute', label: 'Flute' },
        { value: 'cello', label: 'Cello' },
        { value: 'basson', label: 'Basson' },
        { value: 'banjo', label: 'Banjo' },
    ]
    
    // helper function to send request to receive audio
    const getSounds = async(num_notes, durations) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/sounds/${num_notes}/${durations}`, {responseType:'blob'})
            // since Link pass seems not able to pass audui file, create a Blob object and pass it
            // the actual audio file will be created in Game component
            const wav = new Blob([response.data], { type: 'audio/wav' })
            setAudio(wav)
            SetAudio(wav) // set the parent audio state
        }
        catch (e) {
            console.log('play audio error: ', e)
        }

    }

    // helper function to send request to receive the note order
    const getOrder = async() => {
        try {
            const order = (await axios.get('http://localhost:8000/api/sounds/orders/')).data
            setOrder(order)
            SetOrder(order) // set the parent order state
        }
        catch (e) {
            console.log('order error: ', e)
        }
    }

    // once user select the difiiculty, update difficulty
    const onChangeDiff = (value) => {
        setDifficulty(value.value)
        SetDifficulty(value.value)
    }

    const onChangeInstrument = (value) => {
        setInstrument(value.value)
    }


    // Link only avaialable once the order is received, this forces the user to choose the difficulty
    // Link passes three props: tune(blob type), the order, duration
    return(
        <Grid container className="difficulty">
            <Grid item xs={4}>
                <h3>Let's select an instrment!</h3>
                <Select className="Insturment" options={instrument_options} onChange={onChangeInstrument}/>
                {instrument ? 
                    <div>
                        <h3>Then select a difficulty to play the game!</h3>
                        <Select isDisabled={!instrument} className="Difficulty" options={difficulty_options} onChange={onChangeDiff}/>
                    </div>
                    : null
                }          
            </Grid>
        </Grid>
    );
}