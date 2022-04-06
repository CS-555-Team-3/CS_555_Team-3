import { useState, useEffect } from "react"; 
import { Button } from "@mui/material";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import '../../styles/GameOver.css';

export default function PrintScores(val) {
    const [scores, setScores] = useState([]);
    console.log(scores)
    //Load scores from local storage on pageload
    useEffect(() => {
        const json = localStorage.getItem("scores");
        const savedScores = JSON.parse(json);
        if (savedScores) { setScores(savedScores); }
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
        <div key={score.id}> 
            <div className="scoreGroup">
                Score: {score.text} Difficulty: {score.difficulty} Time: {score.time}
                <CopyToClipboard text={score.copytext}>
                    <Button className="copyButton" variant="contained">Copy score</Button>
                </CopyToClipboard>       
            </div>      
        </div>
    ))

    return (
        <div className="Score">
            <ul>{printScores}</ul>
        </div>
    );
}