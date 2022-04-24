import { Button } from '@mui/material';

export default function TutorialEntry() {
    return (
        <div id="tutorialOverlayBG"> 
            <div id="tutorialOverlayBox">
                HOW TO PLAY SOUNDLE
                <div className="tutorialText">
                    <p>You have a certain number of attempts to guess the given chord. Each guess must contain a certain number of notes depending on the difficulty. Hit the "Submit Answer" button to submit a guess.</p>
                    <p>After each attempt, you will be given feedback in the form of the color of the tiles.  The colors will change based on whether each note is in the chord, and if it is in the correct position.</p>
                    <p>Examples:</p>
                    <div id="tutorialImageGrid">
                        <img src={require('./img/3R1Y.png')}></img>
                        <p>One guessed note is in the chord but not in the correct position.</p>
                        <img src={require('./img/1G2Y1R.png')}></img>
                        <p>One guessed note is in the chord and in the correct position, while two are in the chord but not in the correct positions.</p>
                        <img src={require('./img/4G.png')}></img>
                        <p>All notes are in the correct positions.</p>
                    </div>
                    <p>Press "Hint" to hear the sound again and "Undo Selection" to remove your last choice from the board.</p>
                </div>
                <Button id="tutorialExit" variant="text" onClick={() => {document.getElementById("tutorialOverlayBG").style.display = "none"; }}>Close</Button>
            </div>
        </div>
    );
}