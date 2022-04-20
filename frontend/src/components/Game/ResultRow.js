export default function ResultRow(props)
{
    let numBoxes = props.numBoxes;
    let index = props.index;
    let answerBoxOrder = props.answer;

        let answers;
        const results = document.getElementsByClassName(`${index} resultItem`);
        if (answerBoxOrder && answerBoxOrder !== '' && answerBoxOrder.split(',').length === numBoxes)
        {
            answers = answerBoxOrder.split(',');
            console.log("ANSWERS + " +answers);
            for (let i = 0; i < numBoxes.length; i++){
                results[i].classList.add(`${answers[i]}`);
            }
        }

    const resultBoxes = (nBoxes) =>
    {
        let ret = [];

        for(let i = 0; i < nBoxes; i++)
        {
            ret.push(<div key={index} className={`resultItem ${index}`}></div>)
        }
        return ret;
    }

    return (
        <div className="answerContainer">
            {resultBoxes(numBoxes)}
        </div>
    );
}