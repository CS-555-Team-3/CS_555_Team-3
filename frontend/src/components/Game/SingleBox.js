
import { useState, useEffect } from "react";
import '../../styles/Game.css';

export default function SingleBox(props)
{
    const[color, setColor]= useState(props.Color)

    // Drag and drop updating for the selections
    function allowDrop(ev) {
        console.log(ev);
        ev.preventDefault();
    }

    function drop(ev) {
        console.log(ev);
        ev.preventDefault();
        const data = ev.dataTransfer.getData("text");
        console.log(data);
        ev.target.innerHTML = data;
        props.setUserChoice(data)
    }
    
    return (
        <div className='notes' id={props.Color} onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}  disabled></div>
    );
}