import PlayNote from './PlayNote';
import {useNavigate} from "react-router-dom"
import '../../styles/Game.css';
import NoteButton from './NoteButton';
import RoundStartButton from './RoundStartButton';
import { useLocation } from 'react-router-dom'
import UndoSelection from './UndoSelection';
import Score from './Score';

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
     const navigate = useNavigate()



    // helper function to create the tune
    const createTune = (wav) => {
        try {
            const url = window.URL.createObjectURL(wav)
        }
        catch (e) {
            console.log('create audio error: ', e)
        }
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
                        <button id='first' className='notes'  disabled></button>
                        <button id='second' className='notes' disabled></button>
                        <button id='third' className='notes' disabled></button>
                        <button id='fourth' className='notes' disabled></button>
                        <button id='fifth' className='notes' disabled></button>
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
            <div id="undo">
                <UndoSelection>Undo Selection</UndoSelection>
            </div>
            
            <Link to="/end">End Game</Link>
            <button onClick={() => { if(window.confirm('End game?')) { navigate('/end') };}}> End game</button>
        </div>
    );
}