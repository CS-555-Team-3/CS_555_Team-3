import PrintScores from "../Game/PrintScores";
import { Link, useParams } from "react-router-dom";
import {
  exportComponentAsJPEG
} from "react-component-export-image";
import React, { useRef } from 'react';
import "../../styles/GameOver.css";

export default function GameOver(props) {
    let { totalTime } = useParams();
    let { score } = useParams();
    let {showleaderboard} = useParams();
    console.log("type of showleaderboard is : ", typeof(showleaderboard))
    console.log(" showleaderboard is : ", showleaderboard)

  
    const ComponentToPrint = React.forwardRef((props, ref) => (
      <div ref={ref}>
            <Link to="/">🐘 Play Again! 🦔</Link>
            <h3>Your total time was: {totalTime}</h3>
            <h3>Your top 5 scores are: {score}</h3>
            {(showleaderboard === 'true') && <PrintScores />}
      </div>
    ));
    const componentRef = useRef();
  
    return (
      <div id="endGameContainer">
        <ComponentToPrint ref={componentRef} />
        <button onClick={() => exportComponentAsJPEG(componentRef)}>
          Export Scores
        </button>
      </div>
    );
  }
