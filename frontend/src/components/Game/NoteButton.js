import PlayNote from "./PlayNote";
import SetNote from "./SetNote";

export default function NoteButton(props)
{
    let note = props.note;
    let noteName = props.children;
    let the_icon;
    if (mode == true) {
        the_icon = "https://static.vecteezy.com/system/resources/previews/000/546/381/original/music-notes-vector-icon.jpg"
    }


    return(
        <div className={`noteButton ${note}`}>
            <SetNote note={note}>
            {noteName}
            {the_icon}
            </SetNote>
            <PlayNote note={note}>
            </PlayNote>
        </div>
        
        
    );
}
