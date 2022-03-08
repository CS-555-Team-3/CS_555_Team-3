import PlayNote from './PlayNote';
import {useNavigate} from "react-router-dom"
import '../../styles/Game.css';
import NoteButton from './NoteButton';
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


    return (
        <div id="gameContainer">
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
            {   // currently does not work
                // <Link to="/end">End Game</Link>
                // <button onClick={() => { if(window.confirm('End game?')) { navigate('/end') };}}> End game</button>
            }
            
        </div>
    );
}