import { useState, useEffect } from "react"; 

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
    const printScores = scores.slice(0,5).sort((a,b) => Number(b.text) - Number(a.text)).map((score) => (
        <div key={score.id}> 
            <div>{score.text}</div>              
        </div>
    ))

    return (
        <div className="Score">
            <ul>{printScores}</ul>
        </div>
    );
}