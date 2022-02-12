import { render } from "@testing-library/react";
import Favourites from "../components/favourites";

it("renders favourites without crashing", () => {
  document.createElement("div");
  render(<Favourites />);
});
