import { useNavigate, useLocation } from "react-router-dom"
import { useState } from "react";
import '../../styles/Game.css';
import { Grid } from "@mui/material";
import ResultRow from "./ResultRow";
import NoteButtonRow from './NoteButtonRow';
import RoundStartButton from './RoundStartButton';
import UndoSelection from './UndoSelection';
import ResultButton from './ResultButton';
import Hint from './Hint';
import TutorialEntry from './TutorialEntry';
import { Button } from '@mui/material';
import BoxRow from './BoxRow';
import FadeIn from 'react-fade-in';


export default function Game(props) {
    const [clicked, setClicked] = useState(false);
    const [ifStart, setIfStart] = useState(false);
    const navigate = useNavigate()

    let roundTime = 180 // every round has 180s

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

    const duration = data.state.duration;
    const instrument = data.state.instrument;

    // Settings (they do not change)
    const showTutorial = data.state.tutorial === 'on';
    const showTimer = data.state.timer === 'on';
    const Leaderboard = data.state.leaderboard === 'on';

    const [time, setTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const color_blind = data.state.colorblind_mode;
    const difficulty = data.state.difficulty;

    const highlightNotes = async (e) => {
        setClicked(true);
        setIfStart(true)
    }

    const endGame = () => {
        // var ptime = document.getElementById('totalTime').innerHTML;
        var ptime = totalTime
        var pscore = document.getElementById('score').innerHTML;
        if (window.confirm('End game?')) navigate(`/end/${ptime}/${pscore}/${Leaderboard}`);
    }

    if (time > roundTime) {
        // if time is over, it will automatically go to the endgame page
        // var ptime = document.getElementById("totalTime").innerHTML;
        var ptime = totalTime
        var pscore = document.getElementById("score").innerHTML;
        navigate(`/end/${ptime}/${pscore}/${Leaderboard}`); // user can't play because time is over
    }

    return (
        <div id="gameContainer">
            {showTutorial && <TutorialEntry></TutorialEntry>}
            <div id="roundStartContainer">
                <RoundStartButton value={tune} timer={showTimer} onClick={highlightNotes} setTime={setTime} time={time} order={order} roundTime={roundTime} totalTime={totalTime} setTotalTime={setTotalTime}></RoundStartButton>
            </div>
            <FadeIn>
                <div id="gameGrid">
                    {order.map((val, index) =>
                        //this creates # of rows we want, right now it will be # of available notes
                        <ResultRow numBoxes={order.length} index={index} key={index}></ResultRow>
                    )}
                    <BoxRow order={order}></BoxRow>
                </div>
            </FadeIn>

            {ifStart && <>
                <Grid container spacing={2} xs={9} id="gameUtils">
                    <Grid item xs={2}><Hint hint={tune} /></Grid>
                    <Grid item xs={5}><ResultButton order={order} difficulty={difficulty} time={time} setTime={setTime} /></Grid>
                    <Grid item xs={2}><UndoSelection order={order} /></Grid>
                </Grid>
                <NoteButtonRow
                    order={order}
                    duration={duration}
                    clicked={clicked}
                    instrument={instrument}
                    color_blind={color_blind}
                    showTutorial={showTutorial}>
                </NoteButtonRow>
            </>}
            <div id="end">
                <Button className="endButton" onClick={endGame} variant="contained" color="error">End game</Button>
            </div>
        </div>
    );
}

