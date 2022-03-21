import React, { useState } from "react";

export default function ResultButton(props) {
  const [score, setScore] = useState(0);
  const [ifSubmit, setIfSubmit] = useState(false);

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

    
    // for (let i = 0; i < answer.length; i++) {
    //   if (answer[i] == true) {
    //     document.getElementById(boxes[i]).style.backgroundColor = "green";
    //     Score++;
    //   }
    //   if (answer[i] == false) {
    //     document.getElementById(boxes[i]).style.backgroundColor = "red";
    //   }
    // }
    setScore(Score);
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
      <button id="restart" className="button" onClick={restart}>
        Restart
      </button>
    );
  } else {
    restartButton = "";
  }

  return (
    <div>
      <div>
        <button className="button" onClick={compare}>
          Submit Answer
        </button>
        {restartButton}
        <div>
          My score:
          {score}
        </div>
      </div>
    </div>
  );
}
