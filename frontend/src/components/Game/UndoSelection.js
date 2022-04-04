import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function UndoSelection(props) 
{
    const buttonText = props.children;
    const order = props.order;
    const boxes = ["first","second","third","fourth","fifth", "sixth"];
    //input check for noteName being one of our accepted names
    //test - name that doesn't work fails

    const [undoCount, setUndoCount] = useState(props.undoCount);


    

    const handleClick = (e) =>
    {
        let current_selections = props.userRowChoices[props.rowNum]
        console.log("Before Current selections are", current_selections)
        console.log("Current selection[1] is", current_selections[1])

         console.log("current selectuons.length is " , Object.keys(current_selections).length)
        let size = 0;
        for(let j =1; j<Object.keys(current_selections).length; j++){
            if(current_selections[j] !== ""){
                size++;
            }
        }
        if(size !== 0 ){
            setUndoCount(undoCount+1);
            current_selections[size] = "";
            let newState = props.userRowChoices;
            newState[props.rowNum] = current_selections;

            props.setUserRowChoices(newS›tate);

        }else{
            setUndoCount(0);
        }
        
        console.log("size is ", size)
        console.log("After Current selections are", current_selections)

    }
    return (
        <Button onClick={handleClick}>{buttonText}</Button>
    );


}