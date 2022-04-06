import {useNavigate, useLocation} from "react-router-dom"
import { useState, useEffect, useRef } from "react";
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
    const [time, setTime] = useState(0);
    const color_blind = data.state.colorblind_mode
    const timer = data.state.timer
    const difficulty = data.state.difficulty

    const highlightNotes = async (e) =>
    {
        setClicked(true);
        setIfStart(true)
    }
    const [hide_time, setTime] = useState(0);
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
        let i = 'time';
        let x = 'score'
        var ptime = document.getElementById(i).innerHTML
        var pscore = document.getElementById(x).innerHTML
        if(window.confirm('End game?')) 
        { 
            navigate(`/end/${ptime}/${pscore}`) 
        };
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

    if(ifStart === false){
        return (
            <div id="gameContainer">
            {showTutorial && <TutorialEntry></TutorialEntry> }
            <div id="roundStartContainer">
                <RoundStartButton value={tune} timer={showTimer} onClick={highlightNotes} setTime={setTime} time={time}></RoundStartButton>
            </div>

            <BoxRow order = {order}></BoxRow>

            <div id ="end">
                <Button className="endButton" onClick={endGame}> End game</Button>
            </div>
        </div>
        )
    }

    if(ifStart === true){
        return(
            <div id="gameContainer">
            {showTutorial && <TutorialEntry></TutorialEntry> }
            <div id="roundStartContainer">
                <RoundStartButton value={tune} timer={showTimer} onClick={highlightNotes} setTime={setTime} time={time}></RoundStartButton>
            </div>

            <BoxRow order={order}></BoxRow>

            <div id="hint"><Hint hint={tune} /></div>

            <ResultButton order={order} difficulty={difficulty} time={time}></ResultButton>

            {(showTutorial && order.length == 4) && 
            (<img id='drag_tut' src={require('./img/drag_tutorial.gif')}></img>)}
            {show_tut && UnrenderDragTut()}

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
            <div id="end">
                <Button className="endButton" onClick={endGame}> End game</Button>
            </div>
        </div>
    );
    
  }
}

