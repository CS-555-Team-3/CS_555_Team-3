import PrintScores from "../Game/PrintScores";
import { Link, useParams } from "react-router-dom";
import {
  exportComponentAsJPEG
} from "react-component-export-image";
import React, { useRef } from 'react';
import "../../styles/GameOver.css";

export default function GameOver(props) {
  let { time } = useParams();
  let { score } = useParams();

  const ComponentToPrint = React.forwardRef((props, ref) => (
    <div ref={ref}>
      <Link to="/">Play Again!</Link>
      <h3>You total time is: {time}</h3>
      <h3>Your top 5 scores are:{score}</h3>
      <PrintScores />
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
