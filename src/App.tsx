import "./App.css";
import React, { BaseSyntheticEvent, FormEvent } from "react";
import Pokemon from "./components/pokemon";
import Favourites from "./components/favourites";

export default function App() {
  const [showPokemon, setShowPokemon] = React.useState<boolean>(false);
  const [showFavourites, setShowFavourites] = React.useState(false);
  const [pokemonName, setPokemonName] = React.useState("");
  const [disableButton, setDisableButton] = React.useState(true);

  function handleSubmit(event: any) {
    event.preventDefault();
    setPokemonName(event.currentTarget[0].value);
    setShowPokemon(true);
  }

  function handleChange(input: any) {
    if (input.currentTarget.value.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }

  return (
    <div className="App-header">
      {showPokemon === false && showFavourites === false && (
        <div>
          <img
            className="App-logo"
            src={require('./images/truelayer_logo.svg').default}
            alt="logo-truelayer"
            data-testid="logo"
          ></img>
          <form action="#" onSubmit={handleSubmit}>
            <input
              className="App-input"
              type="text"
              name="name"
              placeholder="Insert Pokemon Name"
              onChange={handleChange}
              data-testid="input-text"
            />
            <input
              disabled={disableButton}
              className="App-button"
              type="image"
              src={require('./images/ball_icon.png')}
              alt="poke-ball"
              data-testid="input-button"
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
