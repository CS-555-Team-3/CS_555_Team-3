import React, { useState } from 'react'


function LightBox() {
    const [buttonColor1, setButtonColor1] = useState('blue')
    const [buttonColor2, setButtonColor2] = useState('blue')
    const [buttonColor3, setButtonColor3] = useState('blue')
    const [buttonColor4, setButtonColor4] = useState('blue')
    const [buttonColor5, setButtonColor5] = useState('blue')
    // let buttonColor = document.getElementsByClassName("button")
    // let newColor = await boxLighter()
    let order = [2, 3, 4, 5, 1];   //The array is the input music array from backend
    let userChoice = [2, 5, 4, 6, 1];  //After clicking the boxes by user, it also generate an array
    let answer = [];
    if (order.length !== userChoice.length) throw "error";
    if (!order) throw "Backend hasn't input the music";

    for (let i = 0; i < order.length; i++) {
        if (order[i] !== userChoice[i]) {
            answer[i] = false;
        }
        else {
            answer[i] = true;
        }
    }
    // global.score = 0;
    let button = [];     //It will get the number of button
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] == true) {
            // global.score++;
            button[i] = 'green';   //don't know how to change the button's color
        }
        if (answer[i] == false) {
            button[i] = 'red';
        }
    }
    // console.log(global.score)
    // let temp = "red";
    return (
        <div>
            <div class="container">
                <button className="button" onClick={() => setButtonColor1(button[0])} style={{height:50,width:50, backgroundColor: `${buttonColor1}` }}>Box1</button>
                <button className="button" onClick={() => setButtonColor2(button[1])} style={{height:50,width:50, backgroundColor: `${buttonColor2}` }}>Box2</button>
                <button className="button" onClick={() => setButtonColor3(button[2])} style={{height:50,width:50, backgroundColor: `${buttonColor3}` }}>Box3</button>
                <button className="button" onClick={() => setButtonColor4(button[3])} style={{height:50,width:50,backgroundColor: `${buttonColor4}` }}>Box4</button>
                <button className="button" onClick={() => setButtonColor5(button[4])} style={{height:50,width:50,backgroundColor: `${buttonColor5}` }}>Box5</button>
            </div>
        </div>
    )
}

export default LightBox
