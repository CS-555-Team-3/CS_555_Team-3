import { useState } from "react";
import '../../styles/Game.css';

export default function PlayNote(props)
{
    const noteName = props.note;
    const [selected, setSelected] = useState(false);
    function isPlaying(audelem) { return !audelem.paused || !audelem.ended; }

    const handleClick = async (e) =>
    {
        let notePath = `/sound_notes/${noteName}.wav`;
        let noteAudio = new Audio(notePath);
        await noteAudio.play();
        setSelected(true);
        setTimeout(()=>{
            setSelected(false);
            console.log('finished')
        }, 5000)
    }

    return (
        <button className={`playnote ${noteName} ${selected ? 'selected' : ''}`}  onClick={handleClick}  ></button>
    );
}