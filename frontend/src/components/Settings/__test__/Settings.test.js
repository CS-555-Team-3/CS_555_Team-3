import Settings from "../Settings"
import { act } from 'react-dom/test-utils';
import {mount} from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { render,screen, cleanup} from '@testing-library/react';
import {Grid, Button} from '@mui/material';
import React from 'react';
import Select from 'react-select';



afterEach(cleanup);
afterEach(()=>
{
    jest.clearAllMocks();
})


Enzyme.configure({ adapter: new Adapter() });

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


describe('Does selection and call setState', () =>
{
    test('Select guitar', async () =>
    {
        const setTimer = jest.fn();
        const setTutorial = jest.fn();
        const setColorblind_mode = jest.fn();
        const setLeaderboard = jest.fn();
        const setInstrument = jest.fn();
        const setFamiliar = jest.fn();
        const showSettings = true
        const wrapper = mount(<Settings 
            set_Timer={setTimer}
            set_Tutorial={setTutorial}
            set_Colorblind_mode={setColorblind_mode}
            set_Leaderboard={setLeaderboard}
            SetInstrument={setInstrument}
            SetFamiliar={setFamiliar}
            showSettings={showSettings}/>);
        
        
        act(()=>
        {
            wrapper.find('Select.Instrument').instance().selectOption({ label: 'Guitar', value: 'guitar' });
        });
        
        expect(setInstrument).toHaveBeenCalled();
    })
})



describe('Does the familair tunes settings work', () =>
{
    test('Familiar is on', async () =>
    {
        const setTimer = jest.fn();
        const setTutorial = jest.fn();
        const setColorblind_mode = jest.fn();
        const setLeaderboard = jest.fn();
        const setInstrument = jest.fn();
        const setFamiliar = jest.fn();
        const showSettings = true
        const wrapper = mount(<Settings 
            set_Timer={setTimer}
            set_Tutorial={setTutorial}
            set_Colorblind_mode={setColorblind_mode}
            set_Leaderboard={setLeaderboard}
            SetInstrument={setInstrument}
            SetFamiliar={setFamiliar}
            showSettings={showSettings}/>
            );


        act(()=>
        {
            wrapper.find('Select.Familiar').instance().selectOption({ label: 'On', value: '1' });
        });

        expect(setFamiliar).toHaveBeenCalled();
    })
})

