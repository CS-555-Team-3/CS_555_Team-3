import {useNavigate, useLocation} from "react-router-dom"
import { useState, useEffect } from "react";
import '../../styles/Game.css';
import NoteButton from './NoteButton';
import NoteButtonRow from './NoteButtonRow';
import RoundStartButton from './RoundStartButton';
import UndoSelection from './UndoSelection';
import ResultButton from './ResultButton';
import Hint from './Hint';
import TutorialEntry from './TutorialEntry';
import {Button} from '@mui/material';
import { color } from "@mui/system";





export default function SingleBox(props)
{
    const[color, setColor]= useState(true)
    useEffect(() => { 
        if(props.update === true)
        setColor(true)
        }, 
        [props.update]
    );

    function allowDrop(ev) {
        console.log(ev);
        ev.preventDefault();
    }

    function drop(ev) {
        console.log(ev);
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        console.log(data);
        //ev.target.innerHTML = data;
        props.setUserChoice(data)
        
       // document.getElementById(boxes[i]).style.backgroundColor = "red";

    }
    
    let final_line = props.children;
    return (
        <div>
        {color && 
            <div id={props.id} className='notes' onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}  disabled></div>}
        {!color && 
        <div id={props.id} className='notes' onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}  disabled></div>}
        </div>
    );
}