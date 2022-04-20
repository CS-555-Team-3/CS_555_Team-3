export default function BoxRow(props) {
    const disabled = props.disabled;

    const allowDrop = (ev) => {
        ev.preventDefault();
    }
    
    const drop = (ev) =>{
        ev.preventDefault();
        if (disabled) console.log('nope'); 
        else {
            var data = ev.dataTransfer.getData("text");
            ev.target.classList.add(data);
            ev.target.innerHTML = data;
        }
    }

    let answer_boxes = [];
    let numerals = ['first','second','third','fourth','fifth',"sixth","seventh","eighth","ninth","tenth"];

    for (let i = 0; i<(props.order).length; i++){
        answer_boxes.push(<div id={numerals[i]} className='notes' onDrop={(event) => drop(event)} onDragOver={(event) => allowDrop(event)} ></div>)
    }

    return (            
    <div className="answerContainer">
        <div className='placement'>{answer_boxes}</div>
    </div>);
}