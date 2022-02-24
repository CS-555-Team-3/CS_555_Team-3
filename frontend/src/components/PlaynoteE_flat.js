import Button from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';

class PlayNote_E_flat extends React.Component {

  playNote = (note)  => {
    var note_path = "/sound_notes/" + {note} + ".wav"
    let note_audio = new Audio("/sound_notes/E_flat.wav")
    note_audio.play()
  }

  render() {
    return (
      <Button  onClick={() => this.playNote("E_flat")}>E_Flat</Button>
    );
  } 
}
export default PlayNote_E_flat;
