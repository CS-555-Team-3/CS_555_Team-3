import Button from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';

class PlayNote_E extends React.Component {

  playNote = (note)  => {
    var note_path = "/sound_notes/" + {note} + ".wav"
    let note_audio = new Audio("/sound_notes/E.wav")
    note_audio.play()
  }

  render() {
    return (
      <Button  onClick={() => this.playNote("E")}>E</Button>
    );
  } 
}
export default PlayNote_E;
