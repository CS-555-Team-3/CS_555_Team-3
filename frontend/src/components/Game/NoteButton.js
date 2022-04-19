import PlayNote from "./PlayNote";
import SetNote from "./SetNote";
import {useState,useEffect} from "react";
import {MusicNote} from '@mui/icons-material'

export default function NoteButton(props)
{
    let note = props.note;
    let noteName = props.children;
    let parentSelected = props.selected;
    let instrument = props.instrument
    let color_blind = props.color_blind; //how to add colorBlind as a prop?

    const [icn, setIcon] = useState("null");
    useEffect(()=>{ 
        if (color_blind === 'on') {
            switch(note)
            {
                case("A_flat"): setIcon("😊"); break;
                case("A"): setIcon("😂"); break;
                case("B_flat"): setIcon("❤️"); break;
                case("B"): setIcon("😁"); break;
                case("C"): setIcon("😍"); break;
                case("D_flat"): setIcon("😎"); break;
                case("D"): setIcon("🎶"); break;
                case("E_flat"): setIcon("💕"); break;
                case("E"): setIcon("🤩"); break;
                case("F"): setIcon("😴"); break;
                case("G_flat"): setIcon("😉"); break;
                case("G"): setIcon("😋"); break;
                default: setIcon(note);
            }
        }
        else{
            setIcon(note)
        }
    });

    const [selected, setSelected] = useState(false);

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.className.split(" ")[1]);
    }
  
    async function handleClick(e)
    {
        let notePath = `/sound_notes/${instrument}/${note}.wav`;
        let noteAudio = new Audio(notePath);
        await noteAudio.play();
        setSelected(true);
        setTimeout(()=>{
            setSelected(false);
        }, 2000)
    }

    let variable = selected || parentSelected;

    return( 
        <div draggable="true" id={note} onDragStart={(event) => drag(event)} className={`noteButton ${note} ${variable ? 'selected' : ''}`}>
            <SetNote note={note} order={props.order}>
                {color_blind ? icn : noteName}
            </SetNote>
            <button className={`playnote ${noteName}`} onClick={(e)=>handleClick(e)}><MusicNote></MusicNote></button>
            <PlayNote note={note}>
            </PlayNote>
        </div>
    );
}