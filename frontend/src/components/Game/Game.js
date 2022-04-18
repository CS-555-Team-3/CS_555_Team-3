import {useNavigate, useLocation} from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import '../../styles/Game.css';
import NoteButton from './NoteButton';
import ResultRow from "./ResultRow";
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
    const [clicked, setClicked] = useState(false);
    const [ifStart, setIfStart] = useState(false);
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

    const tune = createTune(data.state.tune)
    const order = data.state.note_order;
    console.log("ORDER: " + order);

    // duration for all component use
    const duration = data.state.duration;

    // instrument for all component use
    const instrument = data.state.instrument;

    const familair = data.state.familair


    // States for the settings 
    const [showTutorial, setShowTutorial] = useState( (data.state.tutorial =='on'))
    const [showTimer, setShowTimer] = useState( (data.state.timer =='on'))
    const [Leaderboard, setLeaderboard] = useState( (data.state.leaderboard=='on'))
    const [time, setTime] = useState(0);
    const color_blind = data.state.colorblind_mode;
    const timer = data.state.timer;
    const difficulty = data.state.difficulty;

    const highlightNotes = async (e) =>
    {
        setClicked(true);
        setIfStart(true)
    }

    let hide_timer = useRef();
    let show_tut = showTutorial;
    function UnrenderDragTut(){
       if(show_tut==false){
           return true;
       }
       setTimeout(() => {
           document.getElementById('drag_tut').id='drag_tut_hide'
           show_tut = false;
           return true;
       setTime(0);
           hide_timer.current = setInterval(() => {
               setTime((n) => {
                   return n + 1;
               });
           }, 1000);}, 9000)
       return true;
   }
    
    const endGame = () => {
        var ptime = document.getElementById('time').innerHTML;
        var pscore = document.getElementById('score').innerHTML;
        if(window.confirm('End game?')) navigate(`/end/${ptime}/${pscore}`);
    }

    return(
        <div id="gameContainer">
            {showTutorial && <TutorialEntry></TutorialEntry> }
            <div id="roundStartContainer">
                <RoundStartButton value={tune} timer={showTimer} onClick={highlightNotes} setTime={setTime} time={time}></RoundStartButton>
            </div>

            <div id="gameGrid">
                {order.map((val, index) =>
                //this creates # of rows we want, right now it will be # of available notes
                <ResultRow numBoxes={order.length} index={index} key={index}></ResultRow>
                )}
                <BoxRow order={order}></BoxRow>
            </div>

            <div id="hint"><Hint hint={tune} /></div>

            <ResultButton order={order} difficulty={difficulty} time={time}></ResultButton>

            {(showTutorial && order.length == 4) && 
            (<img id='drag_tut' src={require('./img/drag_tutorial.gif')}></img>)}
            {show_tut && UnrenderDragTut()}

            {ifStart ? <>
                <NoteButtonRow 
                    order={order} 
                    duration={duration} 
                    clicked={clicked} 
                    instrument={instrument}
                    color_blind={color_blind}>
                </NoteButtonRow> 
                <UndoSelection order={order}>Undo Selection</UndoSelection>
            </>
            : <></>}
            <div id="end">
                <Button className="endButton" onClick={endGame}> End game</Button>
            </div>
        </div>
    );
}

