import SingleBox from "./SingleBox";
import { useState, useEffect } from "react";
export default function ResultRow(props)
{
    //TODO - resultRows in Game should have these appended each time they submit
    //with the wordle-style result colors 
    //props should probably be each slot we have and whether they got it right, wrong or close so that they are colored properly
    let final_line = props.children;

    const[userChoices, setUserChoices] = useState({1:"", 2:"", 3:"", 4:"", 5:"", 6:""})

    const[ choice_1, setChoice1] = useState("");
    const[ choice_2, setChoice2] = useState("");
    const[ choice_3, setChoice3] = useState("");
    const[ choice_4, setChoice4] = useState("");
    const[ choice_5, setChoice5] = useState("");
    const[ choice_6, setChoice6] = useState("");

    let order = props.order;
    let correct_order =  [];

    console.log("Now i have the corrrect order in result row", order)

    let boxes_selected = [false, false, false, false, false, false]

    console.log("currently i have rownum",props.rownum )
    console.log("currently i have selected",props.selected )
    console.log("currently i have userChoices",userChoices )

   
    useEffect(() => { 
        const newchoices = Object.assign({}, userChoices, { 1:choice_1, 2:choice_2, 3:choice_3,
                                            4:choice_4, 5:choice_5, 6:choice_6 })
        console.log('Before the shallow copy is taken, the value in the state is still:',userChoices) // initial value
        setUserChoices(newchoices)
        console.log('After the shallow copy is taken, the value in the state is still:',userChoices)
        
        let Score = 0;

        // Part 2: updating the states based on the inputs of the user
        
       
        if(props.selected === true){

              // 1: make sure the # of enrtered selection is sufficent
            let user_input = 0;
            for(let j = 0; j< props.order.length; j++){
                if(userChoices[j] !== "" ){
                    user_input++;
                }
            }
            if (user_input <  order.length) {
                console.log(userChoices.length)
                alert("Not enough answers, please finish them!");
                return;
            }
            
                // 2: now alot the proper lengths
            for (let i = 0; i < props.order.length; i++) {
                if (props.order[i] !== userChoices[i]) {
                // answer[i] = false;
                if (props.order.indexOf(userChoices[i]) < 0) {
                    boxes_selected.push("red");
                    } else {
                        boxes_selected.push("yellow");
                    }
                } else {
                // answer[i] = true;
                boxes_selected.push("green");
                Score++;
                console.log("NOw the score is ",Score)
                }
            }
        }
        }, 
        [choice_1, choice_2, choice_3, choice_4, choice_5, choice_6]
    );


    // Update teh proper choices if the user selected the submit answer button
   if(props.selected === true){
        console.log("helo me the data is ", choice_1)
        console.log("helo me the data is ", choice_2)
        console.log("helo me the data is ", choice_3)
        console.log("helo me the data is ", choice_4)
        console.log("helo me the data is ", choice_5)
        console.log("helo me the data is ", choice_6)

        
        

   }
    

    return (
        <div className='placement'>
        <SingleBox choice={choice_1} setUserChoice={ (i) =>{setChoice1(i)}} backgroundColor={correct_order[0]}  />
        <SingleBox choice={choice_2} setUserChoice={ (i) =>{setChoice2(i)} } backgroundColor={correct_order[0]} />
        <SingleBox choice={choice_3} setUserChoice={ (i) =>{setChoice3(i)} } backgroundColor={correct_order[0]}/>
        <SingleBox choice={choice_4} setUserChoice={ (i) =>{setChoice4(i)} } backgroundColor={correct_order[0]}/>
        <SingleBox choice={choice_5} setUserChoice={ (i) =>{setChoice5(i)} } backgroundColor={correct_order[0]}/>
        <SingleBox choice={choice_6} setUserChoice={(i) =>{setChoice6(i)} } backgroundColor={correct_order[0]}/>
        </div>
        
    );
}