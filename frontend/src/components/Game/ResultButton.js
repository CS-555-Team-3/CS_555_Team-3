import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

export default function ResultButton(props) {

  const [score, setScore] = useState(0);
  const [scores, setScores] = useState([]);
  const [ifSubmit, setIfSubmit] = useState(false);

  useEffect(() => { 
      const json = JSON.stringify(scores);
      localStorage.setItem("scores", json);
      }, 
      [scores]
  );

  //console.log(props.order);
  var boxes = null;
  if (props.order) {
    let boxLength = props.order.length;
    switch (boxLength) {
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
    //let order = ["A", "B", "C", "D", "E"];   //The array is the input music array from backend
    let userChoice = []; //After clicking the boxes by user, it also generate an array
    //const boxes = ['first', 'second', 'third', 'fourth', 'fifth'];
    console.log(props.order)
    if (!props.order) throw "Backend hasn't input the music";

    for (let i = 0; i < props.order.length; i++) {
      let value = document.getElementById(boxes[i]).innerHTML;
      if(value.length>0){
        userChoice.push(value);
      }
    }
    
    if (boxes&&userChoice.length <  boxes.length) {
      console.log(userChoice.length)
      alert("Not enough answers, please finish them!");
      return;
    }

    let answer = [];
    let Score = 0;
    if (props.order.length !== userChoice.length) throw "error";
    //if (!props.order) throw "Backend hasn't input the music";
    for (let i = 0; i < props.order.length; i++) {
      if (props.order[i] !== userChoice[i]) {
        // answer[i] = false;
        if (props.order.indexOf(userChoice[i]) < 0) {
            document.getElementById(boxes[i]).style.backgroundColor = "red";
          } else {
            document.getElementById(boxes[i]).style.backgroundColor = "yellow";
          }
      } else {
        // answer[i] = true;
        document.getElementById(boxes[i]).style.backgroundColor = "green";
        Score++;
        console.log(Score)
      }
    }

    const newScore = {
      id: Math.random().toString(36).substr(2, 9),
      text: Score,
      time: props.timer,
      difficulty: props.difficulty,
    };
    setScores([...scores,newScore]);
    setScore(Score)
    setIfSubmit(true);
    
  };

  //restart
  const restart = () => {
    for (let i = 0; i < boxes.length; i++) {
      document.getElementById(boxes[i]).style.backgroundColor = "grey";
      document.getElementById(boxes[i]).innerHTML = "";
    }
    setScore(0);
    setIfSubmit(false);
  };

  let restartButton = null;
  if (ifSubmit) {
    restartButton = (
      <Button id="restart" className="button" onClick={restart}>
        Restart
      </Button>
    );
  } else {
    restartButton = "";
  }

  return (
    <div id="resultButton">
        <Button className="button" variant="contained" color="success" onClick={compare}>
          Submit Answer
        </Button>
        {restartButton}
        <div>
          <h5>My score: {score}</h5>
        </div>
    </div>
  );
}
