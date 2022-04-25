import PrintScores from "./PrintScores";
import { Link, useParams } from "react-router-dom";
import {
  exportComponentAsJPEG
} from "react-component-export-image";
import React, { useRef } from 'react';
import "../../styles/GameOver.css";
import { Grid, Button } from "@mui/material";

export default function GameOver(props) {
    let { totalTime } = useParams();
    let { score } = useParams();
    let {showleaderboard} = useParams();
  
    const ComponentToPrint = React.forwardRef((props, ref) => (
      <Grid container xs={8} direction="column" spacing={2} id="printedComponent" ref={ref}>
            <Button href="/" id="playAgain" variant="contained" color="secondary">🐘 Play Again! 🦔</Button>
            <h3>Time: {totalTime}</h3>
            <h3>{score}</h3>
            <h3>Top 5 scores: </h3>
            {(showleaderboard ==='true') && <PrintScores />}
      </Grid>

    ));
    const componentRef = useRef();
  
    return (
      <div id="endGameContainer">
        <ComponentToPrint ref={componentRef} />
        <br/>
        <Button variant="contained" color="secondary" onClick={() => exportComponentAsJPEG(componentRef)}>
          Export Scores
        </Button>
      </div>
    );
  }
