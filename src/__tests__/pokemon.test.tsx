import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, } from '@testing-library/react';
import Pokemon from '../components/pokemon';
import Enzyme, { shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import toJson from 'enzyme-to-json';
import { AxiosResponse } from 'axios';

Enzyme.configure({ adapter: new Adapter() });
const { default: axios } = require('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useEffect()", () => {
  let wrapper: any;
  let useEffect: any;
  jest.mock("axios");
  axios.get = jest.fn();
  axios.post = jest.fn();
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f: () => any) => f());
  };
  beforeEach(() => {
    /* mocking useEffect */
    useEffect = jest.spyOn(React, "useEffect");
    mockUseEffect(); //
  /* shallow rendering */
     wrapper = shallow(<Pokemon dataParentToChild='articuno' />);
     expect(toJson(wrapper)).toMatchSnapshot();  
     wrapper.setProps();
     wrapper.update();
     expect(toJson(wrapper)).toMatchSnapshot();  
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
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
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    expect(axios.get).toHaveBeenCalled();
  });
  test('should return translation info', () => {
    //Our desired output
    const pokemonInfo: any = 
      {
        description : 'description'
      }
    
    //Prepare the response we want to get from axios
    let translation = 'translation';

    // Make the mock return the custom axios response
    mockedAxios.post.mockResolvedValue(translation);
  });
});

describe("renders Loader Pokemon without crashing", () => {
  document.createElement("div");
  const screen = render(<Pokemon />);
  const loader = screen.getByTestId("loader");
  expect(loader).toBeInTheDocument();
});
