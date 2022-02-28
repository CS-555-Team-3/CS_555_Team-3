import PlayNote from "./PlayNote";

export default function NoteButton(props)
{
    let note = props.note;
    let noteName = props.children;

    



    return(
        <div className="noteButton">
            {noteName}
            <PlayNote note={note}></PlayNote>
        </div>
    );
}