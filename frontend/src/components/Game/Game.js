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

    const color_blind = data.state.colorblind_mode

    console.log(color_blind)
    
    return (
        <div id="gameContainer">
            <TutorialEntry></TutorialEntry>
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

            <div id="hint"> <Hint hint={tune} /></div>

            <div><ResultButton></ResultButton></div>
            <div id="noteContainer">    
                <NoteButton note="A_flat" color_blind={color_blind}>Ab</NoteButton>
                <NoteButton note="A" color_blind={color_blind}>A</NoteButton>
                <NoteButton note="B_flat" color_blind={color_blind}>Bb</NoteButton>      
                <NoteButton note="B" color_blind={color_blind}>B</NoteButton>
                <NoteButton note="C" color_blind={color_blind}>C</NoteButton>
                <NoteButton note="D_flat" color_blind={color_blind}>Db</NoteButton>
                <NoteButton note="D" color_blind={color_blind}>D</NoteButton>
                <NoteButton note="E_flat" color_blind={color_blind}>Eb</NoteButton>
                <NoteButton note="E" color_blind={color_blind}>E</NoteButton>
                <NoteButton note="F" color_blind={color_blind}>F</NoteButton>
                <NoteButton note="G_flat" color_blind={color_blind}>Gb</NoteButton>
                <NoteButton note="G" color_blind={color_blind}>G</NoteButton>
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