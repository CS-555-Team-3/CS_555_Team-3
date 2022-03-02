export default function PlayNote(props)
{
    const noteName = props.note;
    const buttonText = props.children;
    //input check for noteName being one of our accepted names
    //test - name that doesn't work fails

    const handleClick = (e) =>
    {
        let notePath = `/sound_notes/${noteName}.wav`;
        let noteAudio = new Audio(notePath);
        noteAudio.play();
    }

    return (
        <button className={`playnote ${noteName}`}  onClick={handleClick}  >{buttonText}</button>
    );
}