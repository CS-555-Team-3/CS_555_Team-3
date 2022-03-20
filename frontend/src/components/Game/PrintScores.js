import { useState, useEffect } from "react"; 
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function PrintScores(val) {
    const [scores, setScores] = useState([]);

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
            <div>
                {score.text}
                <CopyToClipboard text={score.text}>
                    <button>Copy score</button>
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