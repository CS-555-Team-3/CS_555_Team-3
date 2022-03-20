export default function TutorialEntry() {
    return (
        <div id="tutorialOverlayBG"> 
            <div id="tutorialOverlayBox">
                HOW TO PLAY SOUNDLE <button id="tutorialExit" onClick={() => {document.getElementById("tutorialOverlayBG").style.display = "none"; }}> X </button>
                <div className="tutorialText">
                    <p>You have six attempts to guess the given chord.</p>
                    <p>Each guess must contain five notes, hit the "Submit Answer" button to submit a guess.</p>
                    <p>After each attempt, you will be given feedback in the form of the color of the tiles.  The colors will change based on whether each note is in the chord, and if it is in the correct position.</p>
                    <p>Examples:</p>
                    <img src={require('./img/onecorrect.png')}></img>
                    <p>A is in the chord and is in the correct position.</p>
                </div>
            </div>
        </div>
    );
}