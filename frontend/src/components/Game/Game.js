import {useNavigate, useLocation} from "react-router-dom"
import { useState, useEffect } from "react";
import '../../styles/Game.css';
import NoteButton from './NoteButton';
import RoundStartButton from './RoundStartButton';
import UndoSelection from './UndoSelection';
import ResultButton from './ResultButton';
import Hint from './Hint';
import TutorialEntry from './TutorialEntry';



export default function Game(props)
{
    /**TODO
     * -colorblind settings
     * -answer container
     *      -appending a new row after input is submitted
     *      -adding wordle-style results in prior row
     * */

    const [notesState, setNotesState] = useState({
        "A_flat": false,
        "A": false,
        "B_flat": false,     
        "B": false,
        "C": false,
        "D_flat": false,
        "D": false,
        "E_flat": false,
        "E": false,
        "F": false,
        "G_flat": false,
        "G": false
    });

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
    console.log("TUNE: " + tune);

    // order for all component use
    const order = data.state.note_order
    console.log("ORDER: " + order);

    // duration for all component use
    const duration = data.state.duration
    console.log("DURATION " + duration);

    const noteTimeout = (note, duration) =>
    {
        setNotesState(prevState => {return {...prevState, note: true}});
        setTimeout(()=>{
            setNotesState(prevState => {return {...prevState, note: false}});
        }, duration);
    }

    const highlightNotes = async (e) =>
    {
        for (const note of order)
        {
            console.log(note);
            await noteTimeout(note, duration);
        }
    }
    
    function allowDrop(ev) {
        ev.preventDefault();
    }
    
    function drop(ev) {
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

            <ResultButton order={order}></ResultButton>
            <div id="noteContainer">    
                <NoteButton note="A_flat" selected={notesState["A_flat"]}>Ab</NoteButton>
                <NoteButton note="A" selected={notesState["A"]}>A</NoteButton>
                <NoteButton note="B_flat" selected={notesState["B_flat"]}>Bb</NoteButton>      
                <NoteButton note="B" selected={notesState["B"]}>B</NoteButton>
                <NoteButton note="C" selected={notesState["C"]}>C</NoteButton>
                <NoteButton note="D_flat" selected={notesState["D_flat"]}>Db</NoteButton>
                <NoteButton note="D" selected={notesState["D"]}>D</NoteButton>
                <NoteButton note="E_flat" selected={notesState["E_flat"]}>Eb</NoteButton>
                <NoteButton note="E" selected={notesState["E"]}>E</NoteButton>
                <NoteButton note="F" selected={notesState["F"]}>F</NoteButton>
                <NoteButton note="G_flat" selected={notesState["G_flat"]}>Gb</NoteButton>
                <NoteButton note="G" selected={notesState["G"]}>G</NoteButton>
            </div>
            <div id="undo">
                <UndoSelection>Undo Selection</UndoSelection>
            </div>
            <div id ="end">
                <button className="endButton" onClick={() => { if(window.confirm('End game?')) { navigate('/end') };}}> End game</button>
            </div>
        </div>
    );
}