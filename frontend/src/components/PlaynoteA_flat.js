import Button from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';

class PlayNote_A_Flat extends React.Component {

  playNote = (note)  => {
    var note_path = "/sound_notes/" + {note} + ".wav"
    let note_audio = new Audio("/sound_notes/A_Flat.wav")
    note_audio.play()
  }

  render() {
    return (
      <Button  onClick={() => this.playNote("A_Flat")}>A_Flat</Button>
    );
  } 
}
export default PlayNote_A_Flat;
