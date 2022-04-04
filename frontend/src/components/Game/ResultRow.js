import SingleBox from "./SingleBox";
import { useState, useEffect } from "react";
export default function ResultRow(props)
{
    // Step 0: determine of there should be a 5th and 6th box
    const fifthBox = (props.order.length>4);
    const sixthBox = (props.order.length>5)
     
    // Step 1: set up the states for each boxes, selection 
    const[userChoices, setUserChoices] = useState({1:"", 2:"", 3:"", 4:"", 5:"", 6:""})
    const[ choice_1, setChoice1] = useState("");
    const[ choice_2, setChoice2] = useState("");
    const[ choice_3, setChoice3] = useState("");
    const[ choice_4, setChoice4] = useState("");
    const[ choice_5, setChoice5] = useState("");
    const[ choice_6, setChoice6] = useState("");
    const [boxesSelection, setBoxesSelection ] = useState(["", "", "", "", "", ""])

    // Step 2: get the proper order of notes, and wait for the user to make choices
    let order = props.order;
    let correct_order =  [];
    

    // A -- Update Users Choices
    useEffect(() => { 
        const newchoices = Object.assign({}, userChoices, { 1:choice_1, 2:choice_2, 3:choice_3,
                                            4:choice_4, 5:choice_5, 6:choice_6 })
        console.log('Before the shallow copy is taken, the value in the state is still:',userChoices) // initial value
        setUserChoices(newchoices)
        console.log('After the shallow copy is taken, the value in the state is still:',userChoices)
        let new_grid = props.userRowChoices;
        new_grid[props.rowNum] = newchoices;
        props.setUserRowChoices(new_grid);
        console.log("rowNum", props.rowNum);
        console.log("new grid", new_grid);
        }, 
        [choice_1, choice_2, choice_3, choice_4, choice_5, choice_6]
    );

    // B -- Update Color, when and only when the ssubmit is selected
    useEffect(() => { 
        console.log("nember of clicks updated", props.clickResultButton)
        // Part 2: updating the colors of boxes, when the submit answer box is selected.
        if(props.selected === true){
            let Score = 0;
              // 1: make sure the # of enrtered selection is sufficent
            let user_input = 0;
            for(let j = 0; j< props.order.length; j++){
                if(userChoices[j] !== "" ){
                    user_input++;
                }
            }
            if (user_input <  order.length) {
                console.log("length is ",userChoices.length)
                alert("Not enough answers, please finish them!");
                return;
            }
                // 2: now alot the proper colors
            let new_selections = []
            let score = 0
            for (let i = 0; i < props.order.length; i++) {
                if (props.order[i] !== userChoices[i+1]) {
                // answer[i] = false;
                if (props.order.indexOf(userChoices[i+1]) < 0) {
                    new_selections.push("red");
                    } else {
                        new_selections.push("yellow");
                    }
                } else {
                // answer[i] = true;
                new_selections.push("green");
                score++;
                console.log("Now the score is ",score)
                }
            }
            setBoxesSelection(new_selections)
            console.log("new selections are ", new_selections)
            // update the score
            props.setScore(score)
            //props.setSelected(false)
        }
        }, 
        [ props.selected, props.clickResultButton]
    );


    // Update teh proper choices if the user selected the submit answer button
   if(props.selected === true){
        console.log("0.helo me the data is ", choice_1)
        console.log("0.helo me the data is ", choice_2)
        console.log("0.helo me the data is ", choice_3)
        console.log("0.helo me the data is ", choice_4)
        console.log("0.helo me the data is ", choice_5)
        console.log("0.helo me the data is ", choice_6)   

        console.log("Now i have the corrrect order in result row", order)
        console.log("currently i have rownum",props.rownum )
        console.log("currently i have selected",props.selected )
        console.log("currently i have userChoices",userChoices )

        console.log("currently i have boxes selectoin ",boxesSelection )
        console.log("currently i have boxes selectoin ",boxesSelection[0] )     
   }

   const[color, setColor]= useState(props.Color)

    // Drag and drop updating for the selections
    function allowDrop(ev) {
        console.log(ev);
        ev.preventDefault();
    }

    function drop(ev) {
        console.log(ev);
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        console.log(data);
        ev.target.innerHTML = data;
        props.setUserChoice(data)
    }
    

    return (
        <div className='placements'>
        <SingleBox choice={choice_1} setUserChoice={ (i) =>{setChoice1(i)}} 
                        backgroundColor={correct_order[0]} Color={boxesSelection[0]} 
                       // WORK On the undo undo={undo[i]} // WORK On the undo
                        />
        <SingleBox choice={choice_2} setUserChoice={ (i) =>{setChoice2(i)} }  Color={boxesSelection[1]}  />
        <SingleBox choice={choice_3} setUserChoice={ (i) =>{setChoice3(i)} }  Color={boxesSelection[2]} />
        <SingleBox choice={choice_4} setUserChoice={ (i) =>{setChoice4(i)} }  Color={boxesSelection[3]} />
        
        {fifthBox &&        
        <SingleBox choice={choice_5} setUserChoice={ (i) =>{setChoice5(i)} } Color={boxesSelection[4]} /> }
        {sixthBox &&        
        <SingleBox choice={choice_6} setUserChoice={(i) =>{setChoice6(i)} }  Color={boxesSelection[5]} />}
        </div>
        
    );
}