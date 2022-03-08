import {Link} from 'react-router-dom';
import PlayNote from './PlayNote';
import '../../styles/Game.css';
import NoteButton from './NoteButton';
import ResultRow from './ResultRow';
import ResultButton from './ResultButton';


export default function Game(props)
{
    /**TODO
     * -add props for difficulty
     * -colorblind settings
     * -answer container
     *      -appending a new row after input is submitted
     *      -adding wordle-style results in prior row
     *      -
     * */

    var score = 0;

    let final_line = `The current score is ${score}`;



    return (
        <div id="gameContainer">
            <div id="answerContainer">
                <div className='resultRows'></div>
                <div className='placement'>
                    <ResultButton ></ResultButton> 
                </div>
            </div>
            <div id="noteContainer">
                <div classname="A_flat" >
                    <NoteButton note="A_flat">Ab</NoteButton>
                </div>
                <div classname="A">
                    <NoteButton note="A">A</NoteButton>
                </div>
                <div classname="B_flat">
                    <NoteButton note="B_flat">Bb</NoteButton>
                </div>
                <div classname="B">
                    <NoteButton note="B">B</NoteButton>
                </div>
                <div classname="Cr">
                    <NoteButton note="C">C</NoteButton>
                </div>
                <div classname="D_flat">
                    <NoteButton note="D_flat">Db</NoteButton>
                </div>
                <div classname="D">
                    <NoteButton note="D">D</NoteButton>
                </div>
                <div classname="E_flat">
                    <NoteButton note="E_flat">Eb</NoteButton>
                </div>
                <div classname="E">
                    <NoteButton note="E">E</NoteButton>
                </div>
                <div classname="F">
                    <NoteButton note="F">F</NoteButton>
                </div>
                <div classname="G_flat">
                    <NoteButton note="G_flat">Gb</NoteButton>
                </div>
                <div classname="G">
                    <NoteButton note="G">G</NoteButton>
                </div>
            </div>
            <Link to="/end">End Game</Link>

            <ResultRow>{final_line}</ResultRow>
        </div>
    );
}