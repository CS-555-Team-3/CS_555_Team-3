import "./styles.css";
import React from 'react';
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default function GameOver(props) {
    state = {
        value: '',
        copied: false,
    };
    
    render() {
        return (
            <div>
                <Link to="/game">Play Again!</Link>
                <input value= {state.value}
                  onChange={({target: {value}}) => setState({value, copied: false})} />
                
                <CopyToClipboard text={state.value}
                  onCopy={() => setState({copied: true})}>
                  <span> Copy to clipboard with span</span>
                </CopyToClipboard>


                <CopyToClipboard text={state.value} 
                  onCopy={() => setState({copied: true})}>
                  <button>Copy to clipboard with button</button>
                </CopyToClipboard>

                {state.copied ? <span style={{color: 'red'}}>Copied!</span> : null}
            </div>
        );
    }
}
