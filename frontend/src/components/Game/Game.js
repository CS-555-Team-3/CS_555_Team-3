import {Link} from 'react-router-dom';
import PlayNote from './PlayNote';
import '../../styles/Game.css';
import NoteButton from './NoteButton';
import Drag from 'react';
import DropTarget from 'react';
import itemDropped from 'react';


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

     function startDrag(ev) {
        ev.dataTransfer.setData("drag-item", props.dataItem);
      }

      function dragOver(ev) {
        ev.preventDefault();
      }
      
      function drop(ev) {
        const droppedItem = ev.dataTransfer.getData("drag-item");
        if (droppedItem) {
          props.onItemDropped(droppedItem);
        }
      }

    return (
        <div id="gameContainer">
            <div id="answerContainer">
                <div className='resultRows'></div>
                <DropTarget onItemDropped={itemDropped}>
                    <div className='placement' onDragOver={dragOver} onDrop={drop}>
                        <button className='notes' disabled></button>
                        <button className='notes' disabled></button>
                        <button className='notes' disabled></button>
                        <button className='notes' disabled></button>
                        <button className='notes' disabled></button>
                    </div>
                </DropTarget>
            </div>
            <Drag dataItem="item1">
                <div id="noteContainer" draggable onDragStart={startDrag}>
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
            </Drag>
            <Link to="/end">End Game</Link>
        </div>
    );
}