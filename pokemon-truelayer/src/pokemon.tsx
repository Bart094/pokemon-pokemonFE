import { AxiosResponse } from "axios";
import React from "react";
import { useEffect } from "react";
import "./App.css";
import { PokemonInterface } from "./interfaces/pokemon";
import { TranslationResponse } from "./interfaces/translationResponse";
import pokemonHelper from "./services/pokemonHelper";
import pokemonService from "./services/pokemonHelper";

export default function Pokemon(dataParentToChild: any) {
  const [pokemonDescription, setPokemonDescription] = React.useState<string>('');
  const [pokemonFound, setPokemonFound] = React.useState<boolean>();

  useEffect(() => {
    pokemonService
      .getBasicInfo(dataParentToChild.pokemonName)
      .then((pokemonResponse: AxiosResponse<PokemonInterface>) => {
        setPokemonFound(true);
        console.log(pokemonResponse);
        //Pokemon Found
        let description = cleanString(
          pokemonResponse.data.flavor_text_entries[0].flavor_text
        );
        setPokemonDescription(description);
        pokemonService
          .getTranslatedDescription(description)
          .then((translationResponse: AxiosResponse<TranslationResponse>) => {
            setPokemonDescription(
              translationResponse.data.contents.translation
            );
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setPokemonFound(false);
      });
  }, []);

  function cleanString(params: string) {
    return params.replace(/[\u0000-\u001F\u007F-\u009F]/g, " ");
  }

  return (
    <div>
      {pokemonFound ? (
        <div>
          <h1>Pokemon Found: {dataParentToChild.pokemonName}</h1>
          <h2>Pokemon Description: {pokemonDescription}</h2>
          <button className="App-input" onClick={() => pokemonHelper.addFavourite(dataParentToChild.pokemonName)}>Add To Favourites</button>
        </div>
      ) : (
        <div>
          <h1>No Pokemon Found</h1>
        </div>
      )}
    </div>
  );
}
