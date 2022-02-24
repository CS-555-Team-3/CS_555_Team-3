import Button from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';

class PlayNote_D extends React.Component {

  playNote = (note)  => {
    var note_path = "/sound_notes/" + {note} + ".wav"
    let note_audio = new Audio("/sound_notes/D.wav")
    note_audio.play()
  }

  render() {
    return (
      <Button  onClick={() => this.playNote("D")}>D</Button>
    );
  } 
}
export default PlayNote_D;
