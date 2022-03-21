import PlayNote from "./PlayNote";
import SetNote from "./SetNote";
import { useState } from "react";
import {MusicNote} from '@mui/icons-material'

export default function NoteButton(props)
{
    let note = props.note;
    let noteName = props.children;
    let parentSelected = props.selected;

    const [selected, setSelected] = useState(false);

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.className.split(" ")[1]);
    }

    const handleClick = async (e) =>
    {
        let notePath = `/sound_notes/${note}.wav`;
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
            <SetNote note={note}>
            {noteName}
            </SetNote>
            <button className={`playnote ${noteName}`} onClick={handleClick}><MusicNote></MusicNote></button>
        </div>
        
        
    );
}