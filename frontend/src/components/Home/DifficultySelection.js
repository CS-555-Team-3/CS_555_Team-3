import Select from 'react-select'
import axios from 'axios';
import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import difficulty_map from '../../config/DifficultyMap.json';
import '../../styles/Home.css';

export default function DifficultySelection({SetAudio, SetOrder, SetDuration, SetDifficulty, Instrument, Familiar, DailyChallenge})
{  
    // three states: difficulty, audio, order
    const [difficulty, setDifficulty] = useState(null);
    const [audio, setAudio] = useState(null);
    const [order, setOrder] = useState(null);
    
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

    // if user select instrument first without selecting difficulty, it won't send request
    useEffect(() => {
        if (Instrument != "piano" && difficulty) {
            getSounds(difficulty_map[difficulty][0], (difficulty_map[difficulty][1]).toFixed(1))
        }
    }, [Instrument]);

    // Update the sound selectiono if the user changes familair setting
    useEffect(() => {
        if(difficulty){
            getSounds(difficulty_map[difficulty][0], (difficulty_map[difficulty][1]).toFixed(1))
        }
    }, [Familiar]);

    
    // difficulty selection options
    const difficulty_options = [
        { value: 'Beginner', label: 'Beginner' },
        { value: 'Advanced', label: 'Advanced' },
        { value: 'Expert', label: 'Expert' }
    ];
     
    // helper function to send request to receive audio
    const getSounds = async(num_notes, durations) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/sounds/${num_notes}/${durations}/${Instrument}/${Familiar}/${DailyChallenge}`, {responseType:'blob'})
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

    // Link only avaialable once the order is received, this forces the user to choose the difficulty
    // Link passes three props: tune(blob type), the order, duration
    return(
        <Grid container className="difficulty">
            <Grid item xs={4}>
                <Select className="Difficulty" options={difficulty_options} onChange={onChangeDiff}/>          
            </Grid>
        </Grid>
    );
}