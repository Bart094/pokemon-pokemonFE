import React, { useEffect } from "react";
import "../App.css";
import pokemonHelper from "../services/pokemonHelper";

export default function Favourites() {
  const [favourites, setFavourites] = React.useState<any>();

  useEffect(() => {
    setFavourites(pokemonHelper.getFavourites());
  }, []);

  return (
    <div>{favourites ? <h2>{favourites}</h2> : <h2>No Favourites</h2>}</div>
  );
}
