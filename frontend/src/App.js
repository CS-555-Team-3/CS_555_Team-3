import AButton from "./components/Button";
import PlayNote_A  from "./components/PlaynoteA";
import PlayNote_A_Flat from "./components/PlaynoteA_flat";
import PlayNote_B from "./components/PlaynoteB";
import PlayNote_B_Flat from "./components/PlaynoteB_flat";
import PlayNote_C from "./components/PlaynoteC";
import PlayNote_D from "./components/PlaynoteD";
import PlayNote_D_Flat from "./components/PlaynoteD_flat";
import PlayNote_E from "./components/PlaynoteE";
import PlayNote_E_Flat from "./components/PlaynoteE_flat";
import PlayNote_F from "./components/PlaynoteF";
import PlayNote_G from "./components/PlaynoteG";
import PlayNote_G_Flat from "./components/PlaynoteG_flat";

function App() {
  return (
    <div className="App">
      <AButton />
      <PlayNote_A />
      <PlayNote_A_Flat />
      <PlayNote_B/>
      <PlayNote_B_Flat />
      <PlayNote_C/>
      <PlayNote_D/>
      <PlayNote_D_Flat />
      <PlayNote_E/>
      <PlayNote_E_Flat />
      <PlayNote_F/>
      <PlayNote_G/>
      <PlayNote_G_Flat />
    </div>
    
  );
}

export default App;
