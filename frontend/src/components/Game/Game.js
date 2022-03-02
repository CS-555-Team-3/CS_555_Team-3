import {Link} from 'react-router-dom';
import PlayNote from './PlayNote';
import '../../styles/Game.css';
import NoteButton from './NoteButton';
import RoundStartButton from './RoundStartButton';
import { useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react';

export default function Game(props)
{
    /**TODO
     * -add props for difficulty
     * -colorblind settings
     * -answer container
     *      -appending a new row after input is submitted
     *      -adding wordle-style results in prior row
     *      -
     * */


    // helper function to create the tune
    const createTune = (wav) => {
        const url = window.URL.createObjectURL(wav)
        return new Audio(url)
     }

    // extract data from Home component 
    const data = useLocation();

    // tune for all component use
    const tune = createTune(data.state.tune)

    // order for all component use
    const order = data.state.note_order

    // duration for all component use
    const duration = data.state.duration
    
    

    return (
        <div id="gameContainer">
            <div id="roundStartContainer">
                <RoundStartButton value={tune}></RoundStartButton>
            </div>
            <div id="answerContainer">
                <div className='resultRows'></div>
                <div className='placement'>
                    <button className='notes' disabled></button>
                    <button className='notes' disabled></button>
                    <button className='notes' disabled></button>
                    <button className='notes' disabled></button>
                    <button className='notes' disabled></button>
                </div>
            </div>
            <div id="noteContainer">
                <NoteButton note="A_flat">Ab</NoteButton>
                <NoteButton note="A">A</NoteButton>
                <NoteButton note="B_flat">Bb</NoteButton>
                <NoteButton note="B">B</NoteButton>
                <NoteButton note="C">C</NoteButton>
                <NoteButton note="D_flat">Db</NoteButton>
                <NoteButton note="D">D</NoteButton>
                <NoteButton note="E_flat">Eb</NoteButton>
                <NoteButton note="E">E</NoteButton>
                <NoteButton note="F">F</NoteButton>
                <NoteButton note="G_flat">Gb</NoteButton>
                <NoteButton note="G">G</NoteButton>
            </div>
            <Link to="/end">End Game</Link>
        </div>
    );
}