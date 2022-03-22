import {useNavigate, useLocation} from "react-router-dom"
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

    // duration for all component use
    const duration = data.state.duration
    
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
                <RoundStartButton value={tune}></RoundStartButton>
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
                <NoteButton order={order} note="A_flat">Ab</NoteButton>
                <NoteButton order={order} note="A">A</NoteButton>
                <NoteButton order={order} note="B_flat">Bb</NoteButton>      
                <NoteButton order={order} note="B">B</NoteButton>
                <NoteButton order={order} note="C">C</NoteButton>
                <NoteButton order={order} note="D_flat">Db</NoteButton>
                <NoteButton order={order} note="D">D</NoteButton>
                <NoteButton order={order} note="E_flat">Eb</NoteButton>
                <NoteButton order={order} note="E">E</NoteButton>
                <NoteButton order={order} note="F">F</NoteButton>
                <NoteButton order={order} note="G_flat">Gb</NoteButton>
                <NoteButton order={order} note="G">G</NoteButton>
            </div>
            <div id="undo">
                <UndoSelection order={order}>Undo Selection</UndoSelection>
            </div>
            <div id ="end">
                <button className="endButton" onClick={() => { if(window.confirm('End game?')) { navigate('/end') };}}> End game</button>
            </div>
        </div>
    );
}