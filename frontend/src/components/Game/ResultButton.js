import Confetti from "react-confetti";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

export default function ResultButton(props) {

  const [score, setScore] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [scores, setScores] = useState([]);
  const [ifSubmit, setIfSubmit] = useState(false);

  useEffect(() => {
    const json = localStorage.getItem("scores");
    const savedScores = JSON.parse(json);
    if (savedScores) { setScores(savedScores); }
    }, 
    []
  );
  useEffect(() => { 
      const json = JSON.stringify(scores);
      localStorage.setItem("scores", json);
      }, 
      [scores]
  );

  var boxes = null;
  if (props.order) {
    switch (props.order.length) {
      case 4:
        boxes = ["first", "second", "third", "fourth"];
        break;
      case 5:
        boxes = ["first", "second", "third", "fourth", "fifth"];
        break;
      case 6:
        boxes = ["first", "second", "third", "fourth", "fifth", "sixth"];
        break;
      default:
        boxes = ["first", "second", "third", "fourth"];
    }
  }

  const compare = () => {
    let userChoice = []; //After clicking the boxes by user, it also generate an array
    if (!props.order) throw Error("Backend hasn't input the music");

    for (let i = 0; i < props.order.length; i++) {
      let value = document.getElementById(boxes[i]).innerHTML;
      if(value.length>0){
        userChoice.push(value);
      }
    }
    
    if (boxes&&userChoice.length <  boxes.length) {
      alert("Not enough answers, please finish them!");
      return;
    }

    let answerOrder = [];
    let Score = 0;
    if (props.order.length !== userChoice.length) throw Error("error");
    for (let i = 0; i < props.order.length; i++) {
      if (props.order[i] !== userChoice[i]) {
        if (props.order.indexOf(userChoice[i]) < 0) {
            answerOrder.push("red");
          } else {
            answerOrder.push("yellow");
          }
      } else {
        answerOrder.push("green");
        Score++;
      }
    }

    const copytext = "Score: " + Score + " Difficulty: " + props.difficulty + " Time: " + props.time
    const newScore = {
      id: Math.random().toString(36).substr(2, 9),
      text: Score,
      time: props.time,
      difficulty: props.difficulty,
      copytext: copytext
    };
    setScores([...scores,newScore]);
    setScore(Score)

    setIfSubmit(true);
    setAttempt(attempt+1);

    const resultRows = document.getElementsByClassName("answerContainer");
    Array.from(resultRows[attempt].children).forEach((box, x) =>
    {
      box.classList.add(answerOrder[x]);
    });
    restart();
  };

  //restart
  function restart(){
    for (let i = 0; i < boxes.length; i++) {
      document.getElementById(boxes[i]).className = "notes";
      document.getElementById(boxes[i]).innerHTML = "";
    }
    setIfSubmit(false);
  };

  return (
    <div id="resultButton">
      {props.order && score === props.order.length ? 
      <Confetti recycle="false"></Confetti>: <></>}
      {
        props.order && attempt !== props.order.length ?
        <Button className="button" variant="contained" color="success" onClick={compare}>
          🦋 Submit Answer! 🐞
        </Button> : <h3>Game Over!</h3>
      }
        {ifSubmit ? 
        <Button id="restart" className="button" onClick={restart()}>
        Restart
        </Button> : <></>}
        <div>
          <h5 id="attempt">Attempt: {attempt+1}</h5>
          <h5>My score: </h5>
          <h5 id="score">{score}</h5>
        </div>
    </div>
  );
}
