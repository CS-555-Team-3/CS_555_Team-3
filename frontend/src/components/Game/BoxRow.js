
export default function BoxRow(props) {

    function allowDrop(ev) {
        console.log(ev);
        ev.preventDefault();
    }
    
    function drop(ev) {
        console.log(ev);
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        console.log(data);
        ev.target.classList.add(data);
        ev.target.innerHTML = data;
    }

    let answer_boxes = [];
    let numerals = ['first','second','third','fourth','fifth',"sixth","seventh","eighth","ninth","tenth"];

    for (let i = 0; i<(props.order).length; i++){
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
