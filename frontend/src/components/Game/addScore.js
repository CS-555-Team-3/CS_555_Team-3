import { useState, useEffect } from "react"; 

export default function addScore(val) {
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

    const newScore = {
        //Potentially can add more info here; eg date, difficulty
        id: Math.random().toString(36),
        text: val,
    };
    setScores([...scores, newScore]);
}