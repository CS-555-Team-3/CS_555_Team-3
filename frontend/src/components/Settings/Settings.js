
import { useState, useEffect } from 'react';
import Select from 'react-select';



//TODO: Add tests
//TODO: Add tests


const Settings = ( {set_Difficulty,
    set_Colorblind_mode,
    set_Timer,
    set_Tutorial,
    set_Leaderboard, 
    }  ) => {
    
// The following code, allows the user to show/hide the settings menu 
    const [showMenu, setShowMenu] = useState(false)
    function open () {
        setShowMenu(true)
    }
    function close () {
        setShowMenu(false)
    }

// States of all the settings
    // a: difficulty
    // b: timer
    // c: tutorial
    // d: leaderboard
    // e: colorblind mode

    const diff_options = [
        { value: 'easy', label: "Easy"},
        { value: 'moderate', label: "Moderate"},
        { value: 'hard', label: "Hard"},
    ]
    const on_off_options = [
        { value: 'on', label: "On"},
        { value: 'off', label: "Off"},
    ]


  return (
     <div className='settings-pasge'>
         {!showMenu &&
            <button className='set-head'  onClick={open}>Settings Page</button>
            }
         {showMenu && 
            <div className='setting-menu'>
                <button className='set-head'  onClick={close}>Settings Page</button>
                
                <h3>Select Difficulty</h3>
                <Select 
                    name='difficulty' 
                    defaultValue={diff_options[0]}
                    options={diff_options}  onChange={(value) =>set_Difficulty(value.value)} 
                />
                
                <h3>Color-blind Mode</h3>
                <Select 
                    name='color-blind' 
                    defaultValue={on_off_options[1]}
                    options={on_off_options}  onChange={(value) =>set_Colorblind_mode(value.value)} 
                />

                <h3>Timer</h3>
                <Select  
                    name='timer' 
                    defaultValue={on_off_options[1]}
                    options={on_off_options}  onChange={(value) =>set_Timer(value.value)} 
                />
                
                <h3>Tutorial</h3>
                <Select 
                    name='tutorial' 
                    defaultValue={on_off_options[1]}
                    options={on_off_options}  onChange={(value) =>set_Tutorial(value.value)} 
                />
                <h3>Leaderboard</h3>
                <Select  
                    name='leaderboard' 
                    defaultValue={on_off_options[1]}
                    options={on_off_options}  onChange={(value) => set_Leaderboard(value.value)}
                />
            </div>
        }
    </div> 
  )
}

export default Settings