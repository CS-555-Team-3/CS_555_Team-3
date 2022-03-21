import { useState } from "react";

export default function PlayNote(props)
{
    const noteName = props.note;
    const [selected, setSelected] = useState(false);
    //input check for noteName being one of our accepted names
    //test - name that doesn't work fails
    function isPlaying(audelem) { return !audelem.paused || !audelem.ended; }

    const handleClick = async (e) =>
    {
        let notePath = `/sound_notes/${noteName}.wav`;
        let noteAudio = new Audio(notePath);
        await noteAudio.play();
        console.log(noteAudio);
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