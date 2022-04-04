
export default function BoxRow(props) {

    function allowDrop(ev) {
        console.log(ev);
        ev.preventDefault();
    }
    
    function drop(ev) {
        console.log(ev);
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        ev.target.innerHTML = data;
    }

    let answer_boxes = [];
    let numerals = ['first','second','third','fourth','fifth',"sixth","seventh","eighth","ninth","tenth"];

    let diffmap = {"beginner": 4, "advanced": 5, "expert": 6};

    console.log(props);
    console.log(diffmap[props.difficulty]);

    for (let i = 0; i<diffmap[props.difficulty]; i++){
        answer_boxes.push(<div id={numerals[i]} className='notes' onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)}  disabled></div>)
    }


    return (            
    <div id="answerContainer">
    <div className='resultRows'></div>
        <div className='placement'>
        {answer_boxes}
        </div>
</div>)
}
