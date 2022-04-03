import {useNavigate, useLocation} from "react-router-dom"
import { useState, useEffect } from "react";
import '../../styles/Game.css';
import NoteButton from './NoteButton';
import RoundStartButton from './RoundStartButton';
import UndoSelection from './UndoSelection';
import ResultButton from './ResultButton';
import Hint from './Hint';
import TutorialEntry from './TutorialEntry';
import {Button} from '@mui/material';

export default function Game(props)
{
    /**TODO
     * -answer container
     *      -appending a new row after input is submitted
     *      -adding wordle-style results in prior row
     * */

    // there is a way to do this with an object but it wasn't working!
    // const [notesState, setNotesState] = useState({
    //     "A_flat": false,
    //     "A": false,
    //     "B_flat": false,     
    //     "B": false,
    //     "C": false,
    //     "D_flat": false,
    //     "D": false,
    //     "E_flat": false,
    //     "E": false,
    //     "F": false,
    //     "G_flat": false,
    //     "G": false
    // });
    const [aPlay, setAPlay] = useState(false);
    const [aFlatPlay, setAFlatPlay] = useState(false);
    const [bFlatPlay, setBFlatPlay] = useState(false);
    const [bPlay, setBPlay] = useState(false);
    const [cPlay, setCPlay] = useState(false);
    const [dFlatPlay, setDFlatPlay] = useState(false);
    const [dPlay, setDPlay] = useState(false);
    const [eFlatPlay, setEFlatPlay] = useState(false);
    const [ePlay, setEPlay] = useState(false);
    const [fPlay, setFPlay] = useState(false);
    const [gFlatPlay, setGFlatPlay] = useState(false);
    const [gPlay, setGPlay] = useState(false);

    const navigate = useNavigate()

    // helper function to create the tune
    const createTune = (wav) => {
        try {
            const url = window.URL.createObjectURL(wav)
            return new Audio(url)
        }
        catch (e) {
            console.log('create audio error: ', e)
        }
     }

    // extract data from Home component 
    const data = useLocation();

    // tune for all component use
    const tune = createTune(data.state.tune)

    // order for all component use
    const order = data.state.note_order
    console.log("ORDER: " + order);

    // duration for all component use
    const duration = data.state.duration

    const color_blind = data.state.colorblind_mode

    const noteSwitch = (note, bool) =>
    {
        switch(note)
        {
            case "A_flat": setAFlatPlay(bool); break;
            case "A": setAPlay(bool); break;
            case "B_flat": setBFlatPlay(bool); break;
            case "B": setBPlay(bool); break;
            case "C": setCPlay(bool); break;
            case "D_flat": setDFlatPlay(bool); break;
            case "D": setDPlay(bool); break;
            case "E_flat": setEFlatPlay(bool); break;
            case "E": setEPlay(bool); break;
            case "F": setFPlay(bool); break;
            case "G_flat": setGFlatPlay(bool); break;
            case "G": setGPlay(bool); break;
            default: console.log('ERROR not a note')
        }
    }

    const noteTimeout = async (notex) =>
    {
        noteSwitch(notex, true);
        return new Promise(resolve => setTimeout(function(){
            noteSwitch(notex, false);
            resolve();
        }, duration*1000));
    }

    const highlightNotes = async (e) =>
    {
        for (let i = 0; i < order.length; i++)
        {
            await noteTimeout(order[i]);
        }
    }
    
    function allowDrop(ev) {
        console.log(ev);
        ev.preventDefault();
    }
    
    function drop(ev) {
        console.log(ev);
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.innerHTML = data;
    }

    return (
        <div id="gameContainer">
            <TutorialEntry></TutorialEntry>
            <div id="roundStartContainer">
                <RoundStartButton value={tune} onClick={highlightNotes}></RoundStartButton>
            </div>

            <div id="answerContainer">
                <div className='resultRows'></div>
                    <div className='placement'>
                        <div id='first' className='notes' onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}  disabled></div>
                        <div id='second' className='notes' onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} disabled></div>
                        <div id='third' className='notes' onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} disabled></div>
                        <div id='fourth' className='notes' onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} disabled></div>
                        <div id='fifth' className='notes' onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} disabled></div>
                    </div>
            </div>

            <div id="hint"> <Hint hint={tune} /></div>

            <div><ResultButton order={order}></ResultButton></div>
            <div id="noteContainer">    
                <NoteButton order={order} note="A_flat" color_blind={color_blind} selected={aFlatPlay}>Ab</NoteButton>
                <NoteButton order={order} note="A" color_blind={color_blind} selected={aPlay}>A</NoteButton>
                <NoteButton order={order} note="B_flat" color_blind={color_blind} selected={bFlatPlay}>Bb</NoteButton>      
                <NoteButton order={order} note="B" color_blind={color_blind} selected={bPlay}>B</NoteButton>
                <NoteButton order={order} note="C" color_blind={color_blind} selected={cPlay}>C</NoteButton>
                <NoteButton order={order} note="D_flat" color_blind={color_blind} selected={dFlatPlay}>Db</NoteButton>
                <NoteButton order={order} note="D" color_blind={color_blind} selected={dPlay}>D</NoteButton>
                <NoteButton order={order} note="E_flat" color_blind={color_blind} selected={eFlatPlay}>Eb</NoteButton>
                <NoteButton order={order} note="E" color_blind={color_blind} selected={ePlay}>E</NoteButton>
                <NoteButton order={order} note="F" color_blind={color_blind} selected={fPlay}>F</NoteButton>
                <NoteButton order={order} note="G_flat" color_blind={color_blind} selected={gFlatPlay}>Gb</NoteButton>
                <NoteButton order={order} note="G"  color_blind={color_blind} selected={gPlay}>G</NoteButton>
            </div>
            <div id="undo">
                <UndoSelection order={order}>Undo Selection</UndoSelection>
            </div>
            <div id ="end">
                <Button className="endButton" onClick={() => { if(window.confirm('End game?')) { navigate('/end') };}}> End game</Button>
            </div>
        </div>
    );
}