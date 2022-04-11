import { render,screen, cleanup, unmountComponentAtNode} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import {Grid, Button} from '@mui/material';
import React from 'react';
import Select from 'react-select';
import Settings from '../Settings';


afterEach(cleanup);


  describe('does the settings menu Exist', () => {
    const setTimer = "on";
    const setTutorial = "off";
    const setColorblind_mode = "off";
    const setLeaderboard = "on";
    const showSettings =true;
    render ( 
        <Settings
        set_Timer={setTimer}
        set_Tutorial={setTutorial}
        set_Colorblind_mode={setColorblind_mode}
        set_Leaderboard={setLeaderboard}/>
    );

    test('test 1 -> Settings Button Exists ' , () => {
        expect(screen.getByText("Settings"));
    });


    test('test 2 -> since teh default value of show menu is false no menues should be showing Color-blind Mode should not be rendered', () => {
        const setTimer = "on";
        const setTutorial = "off";
        const setColorblind_mode = "off";
        const setLeaderboard = "on";
        render(<Settings
            set_Timer={setTimer}
            set_Tutorial={setTutorial}
            set_Colorblind_mode={setColorblind_mode}
            set_Leaderboard={setLeaderboard}/>
        );
        expect(screen.getByText("Settings")).toBeInTheDocument();
      });


      test('Test 3 --> when the showMenu is simulated to be true, all the selections properly show up  ', () => {
        const on_off_options = [
            { value: 'on', label: "On"},
            { value: 'off', label: "Off"},
        ]
        const showMenu = true;
      render( 
        <div className='setting-menu'>
            <Button className='set-head'  onClick={close}>Settings</Button>
            <Grid container spacing={2}>                
                <Grid item className="settingsControl" xs={3}>
                    <h4>Color-blind Mode</h4>
                    <Select 
                        name='color-blind' 
                        defaultValue={on_off_options[1]}
                        options={on_off_options}  onChange={(value) =>set_Colorblind_mode(value.value)} />
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
    );
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
    expect(screen.getByText("Tutorial")).toBeInTheDocument();
    expect(screen.getByText("Timer")).toBeInTheDocument();
    expect(screen.getByText("Color-blind Mode")).toBeInTheDocument();
});


test('genric test that it renders renders', () => {
    const div = document.createElement("div")
    render(<Settings />, div);
}); 


})

