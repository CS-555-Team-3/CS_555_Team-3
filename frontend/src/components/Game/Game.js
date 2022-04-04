import {useNavigate, useLocation} from "react-router-dom"
import { useState, useEffect } from "react";
import '../../styles/Game.css';
import NoteButton from './NoteButton';
import NoteButtonRow from './NoteButtonRow';
import RoundStartButton from './RoundStartButton';
import UndoSelection from './UndoSelection';
import ResultButton from './ResultButton';
import Hint from './Hint';
import TutorialEntry from './TutorialEntry';
import {Button} from '@mui/material';
import BoxRow from './BoxRow';


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

    const [clicked, setClicked] = useState(false);

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

    // instrument for all component use, build it at sprint4
    // const instrument = data.state.instrument
    const instrument = "piano";
    // States for the settings 
    const [showTutorial, setShowTutorial] = useState( (data.state.tutorial =='on'))
    const [showTimer, setShowTimer] = useState( (data.state.timer =='on'))
    //const [colorblind_mode, setColorblind_mode] = useState( (data.state.colorblind_mode=='on'))
    const [Leaderboard, setLeaderboard] = useState( (data.state.leaderboard=='on'))
    
    const color_blind = data.state.colorblind_mode

    const highlightNotes = async (e) =>
    {
        setClicked(true);
    }
    

    //const delay = setTimeout(() => tune.play(), 5000);
    return (
        <div id="gameContainer">
            {showTutorial && <TutorialEntry></TutorialEntry> }
            <div id="roundStartContainer">
                <RoundStartButton value={tune} timer={showTimer} onClick={highlightNotes}></RoundStartButton>
            </div>

            <BoxRow difficulty = {data.state.difficulty}></BoxRow>

            <div id="hint"> <Hint hint={tune} /></div>

            <ResultButton order={order}></ResultButton>
            <img id='drag_tut' src={require('./img/drag_tutorial.gif')}></img> 
            <NoteButtonRow 
                order={order} 
                duration={duration} 
                clicked={clicked} 
                instrument={instrument}
                color_blind={color_blind}>
            </NoteButtonRow>
            <div id="undo">
                <UndoSelection order={order}>Undo Selection</UndoSelection>
            </div>
            <div id ="end">
                <Button className="endButton" onClick={() => { if(window.confirm('End game?')) { navigate('/end') };}}> End game</Button>
            </div>
        </div>
    );
}
