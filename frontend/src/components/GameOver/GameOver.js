import {Link} from 'react-router-dom';
import React, { Component } from "react"
//import { CopyToClipboard } from "react-copy-to-clipboard";

export default function GameOver(props)
{


   const copyCodeToClipboard = () => {
        const el = document.getElementsByTagName('textarea');
        el[0].select();
        document.execCommand("copy");
      }

   
    return(
        <div>
            <Link to="/">Play Again!</Link>
            <div>
                <textarea
                    value="Your score is: 0 | Number of Tries: (# of tries)"
                />
            </div>
            <div>
                <button onClick={copyCodeToClipboard}>
                    Copy to Clipboard
                </button>
            </div>
         </div>
    );
}
