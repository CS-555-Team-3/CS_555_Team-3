export default function SetNote(props) 
{
    const noteName = props.note;
    const buttonText = props.children;
    const boxes = ["first","second","third","fourth","fifth"];
    //input check for noteName being one of our accepted names
    //test - name that doesn't work fails

    const handleClick = (e) =>
    {
        for(let i=0; i<boxes.length; i++)  
        {
            if(document.getElementById(boxes[i]).innerHTML === "") {
                document.getElementById(boxes[i]).innerHTML = `${noteName}`;
                break;
            }
             
        }
        
    }

    return (
        <button className="playNote" onClick={handleClick}>{buttonText}</button>
    );


}