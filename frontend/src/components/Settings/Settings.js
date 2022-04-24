
import { useState, useEffect } from 'react';
import Select from 'react-select';
import {Grid, Button} from '@mui/material';
import { colors } from '../../styles/styleUtil';
import '../../styles/Home.css';

const Settings = ( {set_Difficulty,
    set_Colorblind_mode,
    set_Tutorial,
    set_Leaderboard,
    SetInstrument,
    SetFamiliar,
    SetDailyChallenge,
    showSettings
    }  ) => {
    
//show/hide the settings menu 
    const [showMenu, setShowMenu] = useState(false)
    function toggleMenu() {
        let menuVal = showMenu;
        setShowMenu(!menuVal);
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
    const yes_no_options = [
        { value: '1', label: "On"},
        { value: '0', label: "Off"},
    ]

    // instrument selection options
    const instrument_options = [
        { value: 'piano', label: 'Piano' },
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
        <Button id="set-button" variant="contained" className='set-head'  onClick={toggleMenu}>Settings</Button>
         {(showMenu || showSettings) && 
            <div className='setting-menu'>
                <Grid container spacing={2}>                   
                    <Grid item className="settingsControl" xs={3}>
                        <h4>Instrument</h4>
                        <Select 
                            styles={colors}
                            className="Instrument"
                            defaultValue={instrument_options[0]} 
                            options={instrument_options} 
                            onChange={onChangeInstrument}/>
                    </Grid>
                    <Grid item className="settingsControl" xs={3}>
                        <h4>Familiar</h4>
                        <Select 
                            styles={colors}
                            className="Familiar"
                            defaultValue={yes_no_options[1]} 
                            options={yes_no_options} 
                            onChange={(value) => SetFamiliar(value.value)}/>
                    </Grid>

                    <Grid item className="settingsControl" xs={3}>
                        <h4>Daily Challenge</h4>
                        <Select 
                            styles={colors}
                            name='DailyChallenge' 
                            defaultValue={yes_no_options[1]}
                            options={yes_no_options}
                            onChange={(value) => SetDailyChallenge(value.value)}
                        />
                    </Grid>

                    <Grid item className="settingsControl" xs={3}>
                        <h4>Color Blind Mode</h4>
                        <Select 
                            styles={colors}
                            name='color-blind' 
                            defaultValue={on_off_options[1]}
                            options={on_off_options}  onChange={(value) =>set_Colorblind_mode(value.value)} 
                        />
                    </Grid>
                    
                    <Grid item className="settingsControl" xs={3}>
                        <h4>Tutorial</h4>
                        <Select 
                            styles={colors}
                            name='tutorial' 
                            defaultValue={on_off_options[1]}
                            options={on_off_options}  onChange={(value) =>set_Tutorial(value.value)} 
                        />
                    </Grid>

                    <Grid item className="settingsControl" xs={3}>
                        <h4>Leaderboard</h4>
                        <Select  
                            styles={colors}
                            name='leaderboard' 
                            defaultValue={on_off_options[0]}
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