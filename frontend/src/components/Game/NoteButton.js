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
    const [color_blind_mode, set_Colorblind_mode] = useState(color_blind == 'on')

    const  [icn, setIcon] = useState("null")
    useEffect ( ()=>{ 
        //console.log("note button",color_blind);
        //console.log(note == "A", note == 'A');
        if (color_blind == 'on') {
            if (note == "A_flat") {
                setIcon("😊");
            }else if (note === "A") {
                setIcon("😂");
            }else if (note === "B_flat") {
                setIcon("❤️");
            }else if (note === "B") {
                setIcon("😁");
            }else if (note === "C") {
                setIcon("😍");
            }else if (note === "D_flat") {
                setIcon("😎");
            }else if (note === "D") {
                setIcon("🎶");
            }else if (note === "E_flat") {
                setIcon("💕");
            }else if (note === "E") {
                setIcon("🤩");
            }else if (note === "F") {
                setIcon("😴");
            }else if (note === "G_flat") {
                setIcon("😉");
            }else if (note === "G") {
                setIcon("😋");
            }else{
                setIcon(note)
            }
        }else{
            setIcon(note)
        }
    })

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
            { !color_blind_mode && <SetNote note={note} order={props.order}>
            {noteName}
            </SetNote> }
            { color_blind_mode && <SetNote note={note} order={props.order}>
            {icn}
            </SetNote> }
            <button className={`playnote ${noteName}`} onClick={(e)=>handleClick(e)}><MusicNote></MusicNote></button>
            <PlayNote note={note}>
            </PlayNote>
        </div>
        
        
    );
}