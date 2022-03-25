import PlayNote from "./PlayNote";
import SetNote from "./SetNote";
import { useState } from "react";
import {MusicNote} from '@mui/icons-material'

export default function NoteButton(props)
{
    let note = props.note;
    let noteName = props.children;
    let parentSelected = props.selected;
    let instrument = props.instrument

    const [selected, setSelected] = useState(false);

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.className.split(" ")[1]);
    }
  
    async function handleClick(e)
    {
        let notePath = `/sound_notes/${instrument}/${note}.wav`;
        let noteAudio = new Audio(notePath);
        await noteAudio.play();
        console.log(noteAudio);
        setSelected(true);
        setTimeout(()=>{
            setSelected(false);
            console.log('finished')
        }, 2000)
    }

    let variable = selected || parentSelected;

    return( 
        <div draggable="true" onDragStart={(event) => drag(event)} className={`noteButton ${note} ${variable ? 'selected' : ''}`}>
            <SetNote note={note} order={props.order}>
            {noteName}
            </SetNote>
            <button className={`playnote ${noteName}`} onClick={(e)=>handleClick(e)}><MusicNote></MusicNote></button>
        </div>
        
        
    );
}