import {Link} from 'react-router-dom';
import PlayNote from './PlayNote';
import '../../styles/Game.css';
import NoteButton from './NoteButton';
import ResultRow from './ResultRow';

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

    let score = 0;

    let final_line = `The current score is ${score}`;

    // get the order from backend  I don't know how to get it
    async function compareAnswer(){
        let order  ;   //The array is the input music array from backend
        let userChoice ;  //After clicking the boxes by user, it also generate an array
        let answer = [];
        if(order.length !== userChoice.length) throw "error";
        if(!order) throw "Backend hasn't input the music";

        for(let i = 0; i<order.length; i++){
            if(order[i]!== userChoice[i]){
                answer[i] = false;
            }
            else{
                answer[i] = true;
            }
        }
        return answer;

    }
    async function boxLighter(){
        let answer = await compareAnswer();
        let button = [];     //It will get the number of button
        for(let i = 0; i<(await answer).length; i++){
            if(answer[i] = true){
                button[i] = 'green';   //don't know how to change the button's color
            }
            if(answer[i] = false){
                button[i] = 'red';
            }
        }
        

    }


    return (
        <div id="gameContainer">
            <div id="answerContainer">
                <div className='resultRows'></div>
                <div className='placement'>
                    <button className='notes' disabled></button>
                    <button className='notes' disabled></button>
                    <button className='notes' disabled></button>
                    <button className='notes' disabled></button>
                    <button className='notes' disabled></button>    
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