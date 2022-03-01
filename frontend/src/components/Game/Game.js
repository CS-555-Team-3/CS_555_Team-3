import {Link} from 'react-router-dom';
import PlayNote from './PlayNote';
import '../../styles/Game.css';
import NoteButton from './NoteButton';
import ResultRow from './ResultRow';
import ResultButton from './ResultButton'
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
                    {/* <button className='notes' disabled></button>
                    <button className='notes' disabled></button>
                    <button className='notes' disabled></button>
                    <button className='notes' disabled></button>
                    <button className='notes' disabled></button>    */}
                    <ResultButton ></ResultButton> 
                </div>
            </div>
            <div id="noteContainer">
                <NoteButton note="A_flat">Ab</NoteButton>
                <NoteButton note="A">A</NoteButton>
                <NoteButton note="B_flat">Bb</NoteButton>
                <NoteButton note="B">B</NoteButton>
                <NoteButton note="C">C</NoteButton>
                <NoteButton note="D_flat">Db</NoteButton>
                <NoteButton note="D">D</NoteButton>
                <NoteButton note="E_flat">Eb</NoteButton>
                <NoteButton note="E">E</NoteButton>
                <NoteButton note="F">F</NoteButton>
                <NoteButton note="G_flat">Gb</NoteButton>
                <NoteButton note="G">G</NoteButton>
            </div>
            <Link to="/end">End Game</Link>

            <ResultRow>{final_line}</ResultRow>
        </div>
    );
}