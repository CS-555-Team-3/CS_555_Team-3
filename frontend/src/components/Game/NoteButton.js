import PlayNote from "./PlayNote";
import SetNote from "./SetNote";

export default function NoteButton(props)
{
    let note = props.note;
    let noteName = props.children;

    return(
        
        <div className="noteButton">
            <SetNote note={note}>
            {noteName}
            </SetNote>
            <PlayNote note={note}>
            </PlayNote>
        </div>
        
        
    );
}