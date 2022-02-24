import Button from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';

class PlayNote_B_Flat extends React.Component {

  playNote = (note)  => {
    var note_path = "/sound_notes/" + {note} + ".wav"
    let note_audio = new Audio("/sound_notes/B_flat.wav")
    note_audio.play()
  }

  render() {
    return (
      <Button  onClick={() => this.playNote("B_flat")}>B_Flat</Button>
    );
  } 
}
export default PlayNote_B_Flat;
