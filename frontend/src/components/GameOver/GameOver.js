import {Link} from 'react-router-dom';
import React, { Component } from "react"
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function GameOver(props)
{
   copyCodeToClipboard = () => {
        const el = this.textArea
        el.select()
        document.execCommand("copy")
      }
   
    return(
        <div>
            <>
                <Link to="/game">Play Again!</Link>
            </>
            <div>
                <textarea
                    ref={(textarea) => this.textArea = textarea}
                    value="Your score is: 0 | Number of Tries: (# of tries)"
                />
            </div>
            <div>
                <button onClick={() => this.copyCodeToClipboard()}>
                    Copy to Clipboard
                </button>
            </div>
         </div>
    );
}
