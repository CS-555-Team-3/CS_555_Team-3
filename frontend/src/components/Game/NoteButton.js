import PlayNote from "./PlayNote";
import SetNote from "./SetNote";
import {useState, useEffect} from 'react';





export default function NoteButton(props)
{

    let note = props.note;

    let noteName = props.children;
    let color_blind = props.color_blind; //how to add colorBlind as a prop?
    const  [icn, setIcon] = useState("null")
    useEffect ( ()=>{ 
        //console.log("note button",color_blind);
        //console.log(note == "A", note == 'A');
        if (color_blind == 'on') {
            if (note == "A_flat") {
                setIcon("A_flat 😊");
            }else if (note == "A") {
                setIcon("A 😂");
            }else if (note == "B_flat") {
                setIcon("B_flat ❤️");
            }else if (note == "B") {
                setIcon("B 😁");
            }else if (note == "C") {
                setIcon("C 😍");
            }else if (note == "D_flat") {
                setIcon("D_flat 😎");
            }else if (note == "D") {
                setIcon("D 🎶");
            }else if (note == "E_flat") {
                setIcon("E_flat 💕");
            }else if (note == "E") {
                setIcon("E 🤩");
            }else if (note == "F") {
                setIcon("F 😴");
            }else if (note == "G_flat") {
                setIcon("G_flat 😉");
            }else if (note == "G") {
                setIcon("G 😋");
            }else{
                setIcon(note)
            }
        }else{
            setIcon(note)
        }
    })

    //console.log("note is ", note)

    //console.log("icn is ", icn)

    return(
        <div className={`noteButton ${note}`}>
            <SetNote note={note}>
            {icn}
            </SetNote>
            <PlayNote note={note}>
            </PlayNote>
        </div>
        
        
    );
}