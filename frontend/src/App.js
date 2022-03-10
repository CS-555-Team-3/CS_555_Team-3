import Home from "./components/Home/Home";
import Game from "./components/Game/Game";
import GameOver from "./components/GameOver/GameOver";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './styles/App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path='/game' element={<Game/>}></Route>
        <Route exact path='/end' element={<GameOver/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
