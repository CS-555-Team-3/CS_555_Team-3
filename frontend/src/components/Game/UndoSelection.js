import { Button } from "@mui/material";

export default function UndoSelection(props) 
{
    const order = props.order;
    const boxes = ["first","second","third","fourth","fifth", "sixth"];

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
        <Button className="undo" onClick={handleClick} variant="contained">Undo Selection</Button>
    );


}