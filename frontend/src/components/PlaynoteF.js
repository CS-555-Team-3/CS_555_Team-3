import Button from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';

class PlayNote_F extends React.Component {

  playNote = (note)  => {
    var note_path = "/sound_notes/" + {note} + ".wav"
    let note_audio = new Audio("/sound_notes/F.wav")
    note_audio.play()
  }

  render() {
    return (
      <Button  onClick={() => this.playNote("F")}>F</Button>
    );
  } 
}
export default PlayNote_F;
