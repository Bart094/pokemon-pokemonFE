import "./App.css";
import pokemonHelper from "./services/pokemonHelper";

export default function Favourites() {

  return (
    <div>
      {pokemonHelper.getFavourites()}
    </div>
  );
}
