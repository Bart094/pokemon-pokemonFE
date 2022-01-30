import axios from "axios";

const BASEURL = "https://pokeapi.co/api/v2/pokemon-species/";
const TRANSLATIONURL = "https://api.funtranslations.com/translate/shakespeare";

//POST Shakespeare Translation
function getTranslatedDescription(params: string) {
  return axios.post(TRANSLATIONURL, params);
}

function getBasicInfo(params: string){
  return axios.get(BASEURL + params);
}

function addFavourite(params: any) {
  if(localStorage.getItem('favourites') == null){
    localStorage.setItem('favourites', params);
  }
  else {
    localStorage.setItem('favourites', localStorage.getItem('favourites') + ',' + params);
  }
}

function getFavourites() {
  return localStorage.getItem('favourites');
}

export default { getTranslatedDescription, getBasicInfo, addFavourite, getFavourites };
