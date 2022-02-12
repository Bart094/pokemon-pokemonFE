import { AxiosResponse } from "axios";
import React from "react";
import "../App.css";
import { PokemonInterface } from "../interfaces/pokemon";
import { TranslationResponse } from "../interfaces/translationResponse";
import pokemonHelper from "../services/pokemonHelper";
import { TailSpin } from  'react-loader-spinner'

export default function Pokemon(dataParentToChild: any) {
  const [pokemonDescription, setPokemonDescription] = React.useState<string>("");
  const [pokemonFound, setPokemonFound] = React.useState<boolean>();
  const [showLoading, setShowLoading] = React.useState(true);

  async function callService(pokemonName: string) {
    pokemonHelper.getBasicInfo(pokemonName)
      .then((pokemonResponse: AxiosResponse<PokemonInterface>) => {
        setPokemonFound(true);
        //Pokemon Found
        let description = pokemonHelper.cleanString(
          pokemonResponse.data.flavor_text_entries[0].flavor_text
        );
        setPokemonDescription(description);
        pokemonHelper.postTranslatedDescription(description)
          .then((translationResponse: AxiosResponse<TranslationResponse>) => {
            //Shakespeare translation found
            setPokemonDescription(translationResponse.data.contents.translated);
            setShowLoading(false);
          })
          .catch((err: Error) => {
            //Shakespeare translation not found
            console.log(err);
            setShowLoading(false);
          });
      })
      .catch((err: Error) => {
        //Pokemon Not Found
        console.log(err);
        setPokemonFound(false);
        setShowLoading(false);
      });
  }

  React.useEffect(() => {
    callService(dataParentToChild.pokemonName);
  }, []);

  return (
    showLoading ? <div data-testid="loader" className="loader"><TailSpin color="rgb(247, 171, 27)"></TailSpin></div> :
    <div>
      {pokemonFound ? (
        <div>
          <h1>Pokemon Found: {dataParentToChild.pokemonName}</h1>
          <h2>Pokemon Description: {pokemonDescription}</h2>
          <button
            data-testid="button-add-fav"
            className="App-input"
            onClick={() =>
              pokemonHelper.addFavourite(dataParentToChild.pokemonName)
            }
          >
            Add To Favourites
          </button>
        </div>
      ) : (
        <div>
          <h1>No Pokemon Found</h1>
        </div>
      )}
    </div>
  );
}
