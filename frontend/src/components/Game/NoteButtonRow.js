import NoteButton from './NoteButton';
import React, { useState, useEffect } from 'react';
import pitchRange from './../../config/PitchRange.json';

export default function NoteButtonRow(props) {
  const order = props.order;
  const duration = props.duration;
  const clicked = props.clicked;
  const instrument = props.instrument;
  const color_blind = props.color_blind;
  const showTutorial = props.showTutorial;

  const [aPlay, setAPlay] = useState(false);
  const [aFlatPlay, setAFlatPlay] = useState(false);
  const [bFlatPlay, setBFlatPlay] = useState(false);
  const [bPlay, setBPlay] = useState(false);
  const [cPlay, setCPlay] = useState(false);
  const [dFlatPlay, setDFlatPlay] = useState(false);
  const [dPlay, setDPlay] = useState(false);
  const [eFlatPlay, setEFlatPlay] = useState(false);
  const [ePlay, setEPlay] = useState(false);
  const [fPlay, setFPlay] = useState(false);
  const [gFlatPlay, setGFlatPlay] = useState(false);
  const [gPlay, setGPlay] = useState(false);

  
  const state_array = [aFlatPlay, aPlay, bFlatPlay, bPlay, cPlay, dFlatPlay, dPlay,
    eFlatPlay, ePlay, fPlay, gFlatPlay, gPlay
  ]

  let note_buttons = [];

  pitchRange.pitchRange.forEach((item, index) => {
    note_buttons.push(<NoteButton key={index} order={order} note={item} 
      selected={state_array[index]} instrument={instrument} color_blind={color_blind} showTutorial={showTutorial}></NoteButton>)
  })

  const noteSwitch = (note, bool) =>
    {
      switch(note)
        {
            case "A_flat": setAFlatPlay(bool); break;
            case "A": setAPlay(bool); break;
            case "B_flat": setBFlatPlay(bool); break;
            case "B": setBPlay(bool); break;
            case "C": setCPlay(bool); break;
            case "D_flat": setDFlatPlay(bool); break;
            case "D": setDPlay(bool); break;
            case "E_flat": setEFlatPlay(bool); break;
            case "E": setEPlay(bool); break;
            case "F": setFPlay(bool); break;
            case "G_flat": setGFlatPlay(bool); break;
            case "G": setGPlay(bool); break;
            default: console.log('ERROR not a note')
        }
    }

  const noteTimeout = async (notex) =>
  {
      noteSwitch(notex, true);
      return new Promise(resolve => setTimeout(function(){
          noteSwitch(notex, false);
          resolve();
      }, duration*1000));
  }

  const highlightNotes = async (e) =>
  {
      for (let i = 0; i < order.length; i++)
      {
          await noteTimeout(order[i]);
      }
  }

  useEffect(() => {
    if (clicked) {
      highlightNotes();
    }
  }, [clicked])


  return (
      <div id="noteContainer">
        {note_buttons}
      </div>
  );
}