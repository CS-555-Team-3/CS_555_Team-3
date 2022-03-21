export default function UndoSelection(props) 
{
    const buttonText = props.children;
    const order = props.order;
    const boxes = ["first","second","third","fourth","fifth", "sixth"];
    //input check for noteName being one of our accepted names
    //test - name that doesn't work fails

    const handleClick = (e) =>
    {
        for(let i=order.length-1; i>=0; i--)  
        {
            if(document.getElementById(boxes[i]).innerHTML !== "") {
                document.getElementById(boxes[i]).innerHTML = "";
                break;
            }
             
        }
        
    }

    return (
        <button onClick={handleClick}>{buttonText}</button>
    );


}