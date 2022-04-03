import Select from 'react-select'
import axios from 'axios';
import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import difficulty_map from './../../config/DifficultyMap.json';
import '../../styles/Home.css';

export default function DifficultySelection({SetAudio, SetOrder, SetDuration})
{  
    // three states: difficulty, audio, order
    const [difficulty, setDifficulty] = useState(null);
    const [audio, setAudio] = useState(null);
    const [order, setOrder] = useState(null);
    

    // once the user choose difficulty, send the request to backend
    useEffect(() => {
        if (difficulty) {
            // set the parent duration statese accoring to the difficulty_map
            SetDuration(difficulty_map[difficulty.value][1])
            getSounds(difficulty_map[difficulty.value][0], (difficulty_map[difficulty.value][1]).toFixed(1))
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
    const options = [
        { value: 'beginner', label: 'Beginner' },
        { value: 'advanced', label: 'Advanced' },
        { value: 'expert', label: 'Expert' }
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
    const onChange = (value) => {
        setDifficulty(value)
    }


    // Link only avaialable once the order is received, this forces the user to choose the difficulty
    // Link passes three props: tune(blob type), the order, duration
    return(
        <Grid container className="difficulty">
            <Grid item xs={4}>
                <Select className="Difficulty" options={options} onChange={onChange}/>
            </Grid>
        </Grid>
    );
}