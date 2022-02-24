import Button from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';

class PlayNote_A extends React.Component {

  playNote = (note)  => {
    let note_audio = new Audio("/sound_notes/A.wav")
    note_audio.play()
  }

  render() {
    return (
      <Button  onClick={() => this.playNote("A")}>A</Button>
    );
  } 
}
export default PlayNote_A;
