import App from "../App";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";


Enzyme.configure({ adapter: new Adapter() });

const mockSubmitEvent: any = {
  currentTarget: {
    0: {
      value: "articuno",
    },
  },
  preventDefault: () => {},
};

const mockChangeEvent: any = {
  currentTarget: {
    value: "articuno",
  },
};

const mockClearEvent: any = {
  currentTarget: {
    value: "",
  },
};


describe("search Pokemon", () => {
  it("should pass shallow snapshot test", () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find(".App-input").length).toBe(2);
    wrapper.find(".App-input").at(0).simulate("change", mockChangeEvent);
    wrapper.find(".App-input").at(0).simulate("change", mockClearEvent);
    wrapper.find("form").simulate("submit", mockSubmitEvent);
  });
});

describe("renders <Favourites/>", () => {
  it("should pass shallow snapshot test", () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.find("button").simulate("click");
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.find("Favourites").length).toBe(1);
    expect(wrapper.find("button").length).toBe(1);
    wrapper.find("button").simulate("click");
  });
});
