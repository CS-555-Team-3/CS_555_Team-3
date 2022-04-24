import { Button } from "@mui/material";
import '../../styles/Game.css';

const Hint = ({hint}) => {

    const playHint = () => {
      try { hint.play(); }
      catch (e) { console.log('Hint: error in playing the tune passed in ', e) }
    }

    return (
        <Button className='hint' variant="contained" onClick={playHint}>Hint</Button>
    );
}

export default Hint;