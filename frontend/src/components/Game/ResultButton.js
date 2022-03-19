import { useState, useEffect } from "react"; 


export default function ResultButton() {
    const [scores, setScores] = useState([]);
    const [score, setScore] = useState(0);

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

    const compare = () => {

        let order = ["A", "B", "C", "D", "E"];   //The array is the input music array from backend
        let userChoice = [];  //After clicking the boxes by user, it also generate an array
        const boxes = ["first","second","third","fourth","fifth"];
        for(let i=0; i<order.length; i++)  
        {
            let value = document.getElementById(boxes[i]).innerHTML
            userChoice.push(value);

        }
        
        let answer = [];
        if (order.length !== userChoice.length) throw "error";
        if (!order) throw "Backend hasn't input the music";

        for (let i = 0; i < order.length; i++) {
            if (order[i] !== userChoice[i]) {
                answer[i] = false;
            }
            else {
                answer[i] = true;
            }
        }

        let Score = 0;
        for (let i = 0; i < answer.length; i++) {
            if (answer[i] == true) {
                document.getElementById(boxes[i]).style.backgroundColor = "green";
                Score++;
            }
            if (answer[i] == false) {
                document.getElementById(boxes[i]).style.backgroundColor = "red";
            }
        }
        
        const newScore = {
            //Potentially can add more info here; eg date, difficulty
            id: Math.random().toString(36),
            text: Score,
        };
        setScores([...scores, newScore]);
        setScore(Score);

    }

    
    return (
        <div>
            <div>
                <button className="button" onClick={compare}>Submit Answer</button>
                <div>My score:
                    {score}
                </div>
            </div>
        </div>
    )
}
