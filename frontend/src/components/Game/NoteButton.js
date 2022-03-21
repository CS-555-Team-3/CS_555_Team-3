import PlayNote from "./PlayNote";
import SetNote from "./SetNote";

export default function NoteButton(props)
{
    let note = props.note;
    let noteName = props.children;

    function drag(ev) {
        ev.dataTransfer.setData("text", ev.target.className.split(" ")[1]);
        
    }
    return(
        <div draggable="true" onDragStart={(event) => drag(event)} className={`noteButton ${note}`}>
            <SetNote  note={note}>
            {noteName}
            </SetNote>
            <PlayNote note={note}>
            </PlayNote>
        </div>
        
        
    );
}