// src/api/index.spec.ts
import axios, { AxiosResponse } from 'axios';
import pokemonHelper from '../services/pokemonHelper';
jest.mock('axios');

//jest.mock(...) is used to automatically mock the axios module.jest.mock('axios');
// Create an object of type of mocked Axios.
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe('getBasicInfo()', () => {
  test('should return pokemon info', () => {
    //Our desired output
    const pokemonInfo: any = 
      {
          name: 'articuno'
      }
    
    
    //Prepare the response we want to get from axios
    const mockedResponse: AxiosResponse = {
      data: pokemonInfo,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    };
    // Make the mock return the custom axios response
    pokemonHelper.getBasicInfo(pokemonInfo.pokemonName);
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    expect(axios.get).toHaveBeenCalled();
  });
});

//jest.mock(...) is used to automatically mock the axios module.jest.mock('axios');
// Create an object of type of mocked Axios.
describe('postTranslation()', () => {
  test('should return translation info', () => {
    //Our desired output
    const pokemonInfo: any = 
      {
        description : 'description'
      }
    
    
    //Prepare the response we want to get from axios
    let translation = 'translation';


    // Make the mock return the custom axios response
    pokemonHelper.postTranslatedDescription(pokemonInfo.description);
    mockedAxios.post.mockResolvedValue(translation);
  });
});

describe('clearFavourites()' , () => {
  pokemonHelper.clearFavourites();
  expect(localStorage.getItem('favourites')).toBe(null);
})

describe('addFavourites()' , () => {
  pokemonHelper.addFavourite('articuno');
  expect(pokemonHelper.getFavourites()).toBe('articuno');
  pokemonHelper.addFavourite('ditto');
  expect(pokemonHelper.getFavourites()).toBe('articuno,ditto');
})

describe('cleanString()' , () => {
  const translation = pokemonHelper.cleanString('description\u0000cleaned');
  expect(translation).toBe('description cleaned');
})