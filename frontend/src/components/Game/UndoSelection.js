import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function UndoSelection(props) 
{
    const buttonText = props.children;
    //input check for noteName being one of our accepted names
    //test - name that doesn't work fails

    const [undoCount, setUndoCount] = useState(props.undoCount);


    const handleClick = (e) =>
    {
        let current_selections = props.userRowChoices[props.rowNum]
        let size = 0;
        for(let j =1; j<Object.keys(current_selections).length; j++){
            if(current_selections[j] !== ""){
                size++;
            }
        }
        if(size !== 0 ){
            setUndoCount(undoCount+1);
            current_selections[size] = "";
            let new_State = props.userRowChoices;
            new_State[props.rowNum] = current_selections;
            const newState = new_State
            props.setUserRowChoices(newState);
        }else{
            setUndoCount(0);
        }
        props.setUndoClicked(props.undoClicked+1);
    }
    return (
        <Button onClick={handleClick}>{buttonText}</Button>
    );


}