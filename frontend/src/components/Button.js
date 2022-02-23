import Button from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';

class AButton extends React.Component {
  constructor(props) {
    super(props)
    this.sounds = null
  }


  componentDidMount() {
    axios.get('http://localhost:8000/api/sounds/5/0.5')
      .then(res => {
        console.log("Seeing it in console means it works!")
        this.sounds = new Audio(res.data);
        this.sounds.crossOrigin = 'anonymous';
      })

  }

  getSound(){
    var playPromise = this.sounds.play();
    // In browsers that don’t yet support this functionality,
    // playPromise won’t be defined.
    if (playPromise !== undefined) {
        playPromise.then(function() {
            // Automatic playback started!
        }).catch(function(error) {
            console.log(error);
            console.log("try to reload");
            this.sounds.load();
            this.sounds.play();
        });
    }
  }
  
  render() {
    return (
      <Button variant="primary" onClick={() => this.getSound()}>Primary</Button>
    )
  }
}

export default AButton;