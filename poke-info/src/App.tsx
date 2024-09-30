import "./App.css";
import Axios from "axios";
import { useState } from "react";
import pokeball from "./assets/pokeball.png";
import openPokeBall from "./assets/openPokeBall.png";
import pokemon_logo from "./assets/pokemon_logo.png";

interface pokemon {
  name: string;
  picture: string;
}

function App() {
  const [openBall, setOpenBall] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<pokemon>()
  const [pokemon2, setPokemon2] = useState<pokemon>()
  const [pokemon3, setPokemon3] = useState<pokemon>()

  function callPokemon() {
      setOpenBall(!openBall);
      if(!(pokemon && pokemon2 && pokemon3)){
      Axios.get(`https://pokeapi.co/api/v2/pokemon/charmander/`).then((response) =>
        setPokemon({
          name: response?.data?.species?.name,
          picture: response?.data?.sprites?.front_default,
        })
      );
      Axios.get(`https://pokeapi.co/api/v2/pokemon/charmeleon/`).then((response) =>
      setPokemon2({
        name: response?.data?.species?.name,
        picture: response?.data?.sprites?.front_default,
      })
    );
    Axios.get(`https://pokeapi.co/api/v2/pokemon/charizard/`).then((response) =>
      setPokemon3({
        name: response?.data?.species?.name,
        picture: response?.data?.sprites?.front_default,
      })
    );
      }
 }

  
  return (
    <div className="App">
       <div className="Header" style={{ marginTop: 40, marginBottom: 20 }}>
          <img src={pokemon_logo} style={{ height: 120, width: 320 }} />
        </div>

      <div onClick={callPokemon}>
        <img
          src={!openBall ? pokeball : openPokeBall}
          style={{ height: openBall ? 180 : 200 }}
        />
      </div>

      {openBall && (
        <div>
          <p style={{ fontSize: 18, color: "black" }}>{pokemon?.name} {pokemon2?.name} {pokemon3?.name}</p>
          <img src={pokemon?.picture} style={{ height: 380, width: 380 }} />
          <img src={pokemon2?.picture} style={{ height: 380, width: 380 }} />
          <img src={pokemon3?.picture} style={{ height: 380, width: 380 }} />
        </div>
      )}

 </div> 
  )
}
export default App;
