import PrintScores from "../Game/PrintScores"
import { Link, useParams } from 'react-router-dom';
import { useState,  } from "react";
import '../../styles/GameOver.css';

export default function GameOver(props) {
    let {time} = useParams()
    let {score} = useParams()
    let {showleaderboard} = useParams()
    const [showTut, setShowTut] =  useState(showleaderboard === 'true');
    return (
        <div id="endGameContainer">
            <Link to="/">🐘 Play Again! 🦔</Link>
            <h3> For your game</h3>
            <h3>You total time was : {time}</h3>
            <h3>Your scores was : {score}</h3>
            {showTut && <h3>Your top 5 scores are: </h3> }
            {showTut &&  <PrintScores />}
        </div>
    );
}
