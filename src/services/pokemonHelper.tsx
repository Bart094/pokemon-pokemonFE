import axios from "axios";

const BASEURL = "https://pokeapi.co/api/v2/pokemon-species/";
const TRANSLATIONURL = "https://api.funtranslations.com/translate/shakespeare";

//POST Shakespeare Translation
function postTranslatedDescription(description: string) {
  const params = new URLSearchParams();
  params.append('text', description);
  return axios.post(TRANSLATIONURL, params, {headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
  }});
}

function getBasicInfo(params: string) {
  return axios.get(BASEURL + params);
}

function addFavourite(params: any) {
  if (localStorage.getItem("favourites") == null) {
    localStorage.setItem("favourites", params);
  } else {
    localStorage.setItem(
      "favourites",
      localStorage.getItem("favourites") + "," + params
    );
  }
}

function getFavourites() {
  return localStorage.getItem("favourites") != null
    ? localStorage.getItem("favourites")
    : "";
}

function clearFavourites() {
  localStorage.removeItem("favourites");
}

function cleanString(params: string) {
  return params.replace(/[\u0000-\u001F\u007F-\u009F]/g, " ");
}

export default {
  postTranslatedDescription,
  getBasicInfo,
  addFavourite,
  getFavourites,
  clearFavourites,
  cleanString
};
