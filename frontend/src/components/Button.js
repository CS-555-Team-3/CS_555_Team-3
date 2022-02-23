import Button from 'react-bootstrap/Button';
import React from 'react';
import axios from 'axios';

class AButton extends React.Component {

  getSound = async() => {
    try {
      const response = await axios.get('http://localhost:8000/api/sounds/3/1.0', {responseType:'blob'})
      const mp3 = new Blob([response.data], { type: 'audio/mp3' })
      const url = window.URL.createObjectURL(mp3)
      const audio = new Audio(url)
      audio.load()
      await audio.play()
      const order = (await axios.get('http://localhost:8000/api/sounds/orders/')).data
      console.log(order)
    } catch (e) {
      console.log('play audio error: ', e)
    }
  }
  
  render() {
    return (
      <Button variant="primary" onClick={() => this.getSound()}>Primary</Button>
    )
  }
}

export default AButton;