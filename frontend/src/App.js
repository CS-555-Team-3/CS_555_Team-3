import Home from "./components/Home/Home";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Settings from "./components/Settings/Settings";
import { useState } from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/settings" element={<Settings />}></Route>
        <Route exact path='/game' element={<Game />}></Route>
        <Route exact path='/end/:time' element={<GameOver/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
