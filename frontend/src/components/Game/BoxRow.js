export default function BoxRow(props)
{
    let boxes = ["first","second","third","fourth","fifth", "sixth"];
    // tune from parent component
    const order = props.order;

    // base on the len of the oder to slice boxes
    boxes = boxes.slice(0, order.length);
    console.log(order.length);
    let buttons = [];
    boxes.forEach((id, index) => {
      buttons.push(<button id={id} key={index} className='notes' disabled></button>)
    })
    
    return (
        <div>
          {buttons}
        </div>
    );
}