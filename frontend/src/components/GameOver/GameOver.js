import PrintScores from "../Game/PrintScores"
import { Link } from 'react-router-dom';

export default function GameOver(props) {
    return (
        <div>
            <Link to="/">Play Again!</Link>
            <h6>Your top 5 scores are:</h6>
            <PrintScores />
        </div>
    );
}
