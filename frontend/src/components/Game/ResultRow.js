export default function ResultRow(props)
{
    //TODO - resultRows in Game should have these appended each time they submit
    //with the wordle-style result colors 
    //props should probably be each slot we have and whether they got it right, wrong or close so that they are colored properly
    let final_line = props.children;

    return (
        <h1>{final_line}</h1>
    );
}