import { Button } from "@mui/material";
import { colors } from "../../styles/styleUtil";

export default function SetNote(props) 
{
    const noteName = props.note;
    const order = props.order;
    const boxes = ["first","second","third","fourth","fifth", "sixth"];

    const handleClick = (e) =>
    {
        for(let i=0; i<order.length; i++)  
        {
            if(document.getElementById(boxes[i]).innerHTML === "") {
                document.getElementById(boxes[i]).innerHTML = `${noteName}`
                document.getElementById(boxes[i]).classList.add(noteName);
                break;
            }  
        }  
    }

    return (
        <Button className={`setNote ${noteName}`} onClick={handleClick} styles={colors}>Select</Button>
    );
}