import {Link} from 'react-router-dom';
import Select from 'react-select'
import axios from 'axios';
import React, { useState, useEffect } from 'react';

export default function Home()
{  
    // three states: difficulty, audio, order
    const [difficulty, setDifficulty] = useState(null);
    const [audio, setAudio] = useState(null);
    const [order, setOrder] = useState(null);
    


    // once the user choose difficulty, send the request to backend
    useEffect(() => {
        if (difficulty) {
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

    // difiiculty map to [number of notes, durations]
    const difficulty_map = {
        "beginner": [4, 2.0],
        "advanced": [5, 1.5],
        "expert": [6, 1.0]
    }

    
    // helper function to send request to receive audio
    const getSounds = async(num_notes, durations) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/sounds/${num_notes}/${durations}`, {responseType:'blob'})
            // since Link pass seems not able to pass audui file, extracting response.data here
            // the actual audio file will be created in Game component
            setAudio(response.data)
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
        <>
            <h3>Please select a difficulty to play the game!</h3>
            <Select options={options} onChange={onChange}/>
            <Link to={order ? "/game" : "#"} state={{ 
                tune: audio, 
                note_order: order, 
                duration: order ? difficulty_map[difficulty.value][1]: null
            }}>Play Game</Link>
        </>
    );
}