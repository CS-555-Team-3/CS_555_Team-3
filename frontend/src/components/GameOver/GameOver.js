import PrintScores from "../Game/PrintScores"
import { Link, useParams } from 'react-router-dom';
import '../../styles/GameOver.css';

export default function GameOver(props) {
    let {time} = useParams()
    let {score} = useParams()
    return (
        <div id="endGameContainer">
            <Link to="/">🐘 Play Again! 🦔</Link>
            <h3>Your total time was: {time}</h3>
            <h3>Your top 5 scores are: {score}</h3>
            <PrintScores />
        </div>
    );
}
