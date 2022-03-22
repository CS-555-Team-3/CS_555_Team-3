import PrintScores from "../Game/PrintScores"
import { Link } from 'react-router-dom';
import '../../styles/GameOver.css';

export default function GameOver(props) {
    return (
        <div id="endGameContainer">
            <Link to="/">Play Again!</Link>
            <h3>Your top 5 scores are:</h3>
            <PrintScores />
        </div>
    );
}
