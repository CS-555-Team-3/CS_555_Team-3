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

import SingleBox from "./SingleBox";
import ResultRow from "./ResultRow";
import { SelectUnstyled } from "@mui/base";

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
    const [showTutorial, setShowTutorial] = useState( (data.state.tutorial ==='on'))
    const [showTimer, setShowTimer] = useState( (data.state.timer ==='on'))
    //const [colorblind_mode, setColorblind_mode] = useState( (data.state.colorblind_mode=='on'))
    const [Leaderboard, setLeaderboard] = useState( (data.state.leaderboard ==='on'))


    const [score, setScore] = useState(0);
    const color_blind = data.state.colorblind_mode

    const highlightNotes = async (e) => {setClicked(true);}
    
 
    // KEEP !!! --> This is the states that are passed around to many child components
    const[rowNum, setRowNum] = useState(1);
    const[selected, setSelected ] = useState(false);
    const [clickResultButton, setClickResultButton] = useState(0); // used to update result
    const [clicked, setClicked] = useState(false);
    const [undoClicked, setUndoClicked] = useState(0);
   
    const[userRowChoices, setUserRowChoices] = useState({
        1:{1:"first", 2:"", 3:"", 4:"", 5:"", 6:""}, 
        2:{1:"", 2:"", 3:"", 4:"", 5:"", 6:""},
        3:{1:"", 2:"", 3:"", 4:"", 5:"", 6:""},
        4:{1:"", 2:"", 3:"", 4:"", 5:"", 6:""},
        5:{1:"", 2:"", 3:"", 4:"", 5:"", 6:""}  } )
   
        useEffect(() => { 
          console.log("GAme: Score is currently", score)
            console.log("GAme: user Row choice are", userRowChoices)
        }, 
        [userRowChoices]
        ); 

 

     // KEEP !!! --> This is the states that are passed around to many child components

    
    return (
        <div id="gameContainer">
            {showTutorial && <TutorialEntry></TutorialEntry> }
            <div id="roundStartContainer">
                <RoundStartButton value={tune} timer={showTimer} onClick={highlightNotes}></RoundStartButton>
            </div>

            <div id="answerContainer">
                <div className='resultRows'>

                </div>
                <div className='placement'>
                    <ResultRow order={order} rownum={rowNum} selected={selected} setSelected={(i) => {setSelected(i)}} 
                                setScore={(i) => {setScore (i)}} clickResultButton={clickResultButton} 
                                rowNum={rowNum} userRowChoices={userRowChoices} setUserRowChoices={(i) => setUserRowChoices(i)}/>
                </div>
            </div>

            <div id="hint"> <Hint hint={tune} /></div>

            <ResultButton order={order}   setRowNum={(i) => {setRowNum(i)}} 
                        setSelected={(i) => {setSelected(i)}}  currentrow={rowNum}
                        score={score}   clickResultButton={clickResultButton}  setClickResultButton= {(i)  => setClickResultButton(i)}
                        rowNum={rowNum} userRowChoices={userRowChoices} setUserChoices={(i) => setUserRowChoices(i)}
            />

            <NoteButtonRow 
                order={order} 
                duration={duration} 
                clicked={clicked} 
                instrument={instrument}
                color_blind={color_blind}>
            </NoteButtonRow>
            <div id="undo">
                <UndoSelection order={order} rowNum={rowNum} 
                    userRowChoices={userRowChoices} setUserRowChoices={(i) => setUserRowChoices(i)}>
                        Undo Selection</UndoSelection>
            </div>
            <div id ="end">
                <Button className="endButton" onClick={() => { if(window.confirm('End game?')) { navigate('/end') };}}> End game</Button>
            </div>
        </div>
    );
}
