import { Button } from "@mui/material";

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
            let box = document.getElementById(boxes[i])
            if(box!=null && box.innerHTML !== "" && box.classList.length > 1) {
                box.innerHTML = "";
                box.className = "";
                box.className = "notes";
                break;
            }
             
        }
        
    }

    return (
        <Button onClick={handleClick}>{buttonText}</Button>
    );


}