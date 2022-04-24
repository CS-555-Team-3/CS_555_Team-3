import { useState, useEffect } from "react"; 
import { Button } from "@mui/material";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import '../../styles/GameOver.css';

export default function PrintScores(val) {
    const [scores, setScores] = useState([]);
    //Load scores from local storage on pageload
    useEffect(() => {
        const json = localStorage.getItem("scores");
        const savedScores = JSON.parse(json);
        if (savedScores) setScores(savedScores);
        }, 
        []
    );

    //Save scores to local storage when changed
    useEffect(() => { 
        const json = JSON.stringify(scores);
        localStorage.setItem("scores", json);
        }, 
        [scores]
    );
    
    //Gets top 5 scores from local storage
    const printScores = scores.sort((a,b) => Number(b.text) - Number(a.text)).slice(0,5).map((score) => (
        <div className="scoreGroup" key={score.id}> 
            <br/>
            <div className="copyGroup">
                <div className="scoreInfo">
                    <h4>Score: {score.text}</h4> 
                    <h4>Difficulty: {score.difficulty}</h4> 
                    <h4>Time: {score.time}</h4>
                </div>
                <CopyToClipboard text={score.copytext}>
                    <Button className="copyButton" variant="contained">Copy score</Button>
                </CopyToClipboard>
                <CopyToClipboard text={score.emojis}>
                    <Button className="copyButton" variant="contained">Copy emoji</Button>
                </CopyToClipboard>
            </div>
            <br/>
        </div>
    ))

    return (
        <div className="score">
            <ul>{printScores}</ul>
        </div>
    );
}