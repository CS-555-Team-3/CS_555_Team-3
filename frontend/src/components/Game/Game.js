import {Link} from 'react-router-dom';

export default function Game(props)
{
    /**TODO
     * -add props for difficulty
     * -colorblind settings
     * */

    return (
        <div id="gameContainer">
            <Link to="/end">End Game</Link>
        </div>
    );
}