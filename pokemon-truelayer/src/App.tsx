import "./App.css";
import React from "react";
import Pokemon from "./pokemon";
import Favourites from "./favourites";

export default function App() {
  const [showPokemon, setShowPokemon] = React.useState<boolean>(false);
  const [showFavourites, setShowFavourites] = React.useState(false);
  const [pokemonName, setPokemonName] = React.useState("");
  const [disableButton, setDisableButton] = React.useState(true);

  function handleSubmit(event: any) {
    event.preventDefault();
    setPokemonName(event.target[0].value);
    setShowPokemon(true);
  }

  function handleChange(input: any) {
    setPokemonName(input.currentTarget.value);
    if (pokemonName.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }

  return (
    <div className="App-header">
      {showPokemon == false && showFavourites == false && (
        <div>
          <img
            className="App-logo"
            src="https://truelayer.com/static/f7ff55b4588b66f31ccc555a48bdf186/truelayer_logo_white_w167_h31.svg"
          ></img>
          <form action="#" onSubmit={handleSubmit}>
            <input
              className="App-input"
              type="text"
              name="name"
              placeholder="Insert Pokemon Name"
              onChange={handleChange}
            />
            <input
              disabled={disableButton}
              className="App-button"
              type="image"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/512px-Pok%C3%A9_Ball_icon.svg.png"
            />
          </form>
          <button
            className="App-input"
            type="button"
            onClick={() => setShowFavourites(true)}
          >
            List Of Favourites
          </button>
        </div>
      )}
      {showFavourites ? <Favourites /> : null}
      {showPokemon ? <Pokemon pokemonName={pokemonName.toLowerCase()} /> : null}
      {showPokemon || showFavourites ? (
        <button
          className="App-input"
          type="submit"
          autoFocus={true}
          onKeyPress={() => setShowPokemon(!showPokemon)}
          onClick={() => {
            if (showFavourites || showPokemon) {
              setShowPokemon(false);
              setShowFavourites(false);
            }
            setDisableButton(true);
          }}
        >
          Back
        </button>
      ) : null}
    </div>
  );
}
