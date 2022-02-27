import { useState, useEffect } from "react"; 

export default function Score(props)
{
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

    //Assumes <input type="text" name="score" />, can be trivially changed to pass in as a variable like deleteScore if needed
    const addScore = (e) => { 
        e.preventDefault();
        const newScore = {
            //Potentially can add more info here; eg date, difficulty
            id: Math.random().toString(36),
            text: e.target.score.value,
        };
        setScores([...scores, newScore]);
        e.target.score.value = "";

    }

    const deleteScore = (scoreIdToDelete) => {
        const filteredScores = scores.filter((score) => score.id !== scoreIdToDelete);
        setScores(filteredScores);
    };

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

    /** For debug:
    const printScores = scores.slice(0,5).sort((a,b) => Number(b.text) - Number(a.text)).map((score) => (
        <div key={score.id}> 
            <div>{score.text}</div>              
            <button onClick={() => deleteScore(score.id)}>delete</button>
        </div>
    )) 
    
    return (
        <div className="Score">
            <form onSubmit={addScore}>
                    <input type="text" name="score" />
                    <input type="Submit" />
            </form>
            <ul>{printScores}</ul>
        </div>
    ); 
    */
}
