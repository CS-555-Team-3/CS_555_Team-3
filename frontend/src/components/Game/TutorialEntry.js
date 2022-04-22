import { Button } from '@mui/material';

export default function TutorialEntry() {
    return (
        <div id="tutorialOverlayBG"> 
            <div id="tutorialOverlayBox">
                HOW TO PLAY SOUNDLE <Button id="tutorialExit" variant="text" onClick={() => {document.getElementById("tutorialOverlayBG").style.display = "none"; }}>Close</Button>
                <div className="tutorialText">
                    <p>You have six attempts to guess the given chord.</p>
                    <p>Each guess must contain a certain number of notes depending on the difficulty. Hit the "Submit Answer" button to submit a guess.</p>
                    <p>After each attempt, you will be given feedback in the form of the color of the tiles.  The colors will change based on whether each note is in the chord, and if it is in the correct position.</p>
                    <p>Examples:</p>
                    <img src={require('./img/3R1Y.png')}></img>
                    <p>One guessed note is in the chord but not in the.</p>
                    <img src={require('./img/1G2Y1R.png')}></img>
                    <p>One guessed note is in the chord and in the correct position, while two are in the chord but not in the correct positions.</p>
                    <img src={require('./img/4G.png')}></img>
                    <p>All notes are in the correct positions.</p>
                </div>
            </div>
        </div>
    );
}