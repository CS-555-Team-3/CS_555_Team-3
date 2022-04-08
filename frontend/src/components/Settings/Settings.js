
import { useState, useEffect } from 'react';
import Select from 'react-select';
import {Grid, Button} from '@mui/material';
import '../../styles/Home.css';

const Settings = ( {set_Difficulty,
    set_Colorblind_mode,
    set_Timer,
    set_Tutorial,
    set_Leaderboard,
    SetInstrument,
    showSettings
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
        { value: "beginner", label: "Beginner"},
        { value: "advanced", label: "Advanced"},
        { value: "expert", label: "Expert"},
    ]
    const on_off_options = [
        { value: 'on', label: "On"},
        { value: 'off', label: "Off"},
    ]

    // instrument selection options
    const instrument_options = [
        { value: 'piano', label: 'Pinao' },
        { value: 'guitar', label: 'Guitar' },
        { value: 'viola', label: 'Viola' },
        { value: 'oboe', label: 'Oboe' },
        { value: 'mandolin', label: 'Mandolin' },
        { value: 'flute', label: 'Flute' },
        { value: 'cello', label: 'Cello' },
        { value: 'basson', label: 'Basson' },
        { value: 'banjo', label: 'Banjo' },
    ]

    const onChangeInstrument = (value) => {
        SetInstrument(value.value)
    }

    return (
     <div className='settings-page'>
         {!showMenu &&
            <Button id = "set-button" className='set-head'  onClick={open}>Settings</Button>
            //todo - use only one Button calling a single onClick function
            }
         {(showMenu || showSettings) && 
            <div className='setting-menu'>
                <Button id="test" className='set-head' onClick={close}>Settings</Button>
                <Grid container spacing={2}>
                    {/* deciding whether or not this belongs in the settings panel or not
                    <Grid item className="settingsControl" xs={3}>
                        <h4>Select Difficulty</h4>
                        <Select 
                            name='difficulty' 
                            defaultValue={diff_options[0]}
                            options={diff_options}  onChange={(value) =>set_Difficulty(value.value)} 
                        />
                    </Grid> */}
                    
                    <Grid item className="settingsControl" xs={3}>
                        <h4>Instrument</h4>
                        <Select 
                            className="Instrument"
                            defaultValue={instrument_options[0]} 
                            options={instrument_options} 
                            onChange={onChangeInstrument}/>
                    </Grid>

                    <Grid item className="settingsControl" xs={3}>
                        <h4>Color-blind Mode</h4>
                        <Select 
                            name='color-blind' 
                            defaultValue={on_off_options[1]}
                            options={on_off_options}  onChange={(value) =>set_Colorblind_mode(value.value)} 
                        />
                    </Grid>

                    <Grid item className="settingsControl" xs={3}>
                        <h4>Timer</h4>
                        <Select  
                            name='timer' 
                            defaultValue={on_off_options[1]}
                            options={on_off_options}  onChange={(value) =>set_Timer(value.value)} 
                        />
                    </Grid>
                    
                    <Grid item className="settingsControl" xs={3}>
                        <h4>Tutorial</h4>
                        <Select 
                            name='tutorial' 
                            defaultValue={on_off_options[1]}
                            options={on_off_options}  onChange={(value) =>set_Tutorial(value.value)} 
                        />
                    </Grid>

                    <Grid item className="settingsControl" xs={3}>
                        <h4>Leaderboard</h4>
                        <Select  
                            name='leaderboard' 
                            defaultValue={on_off_options[1]}
                            options={on_off_options}  onChange={(value) => set_Leaderboard(value.value)}
                        />
                    </Grid>
                </Grid>
            </div>
        }
    </div> 
  )
}

export default Settings