import PlayNote from "./PlayNote";
import SetNote from "./SetNote";

export default function NoteButton(props)
{
    let note = props.note;
    let noteName = props.children;

    return(
        <div className="noteButton">
            {noteName}
            
            <PlayNote note={note}>
                //realize its a bit jank, but it works according to my user story!
                <SetNote note={note}></SetNote>
            </PlayNote>
            
        </div>
    );
}