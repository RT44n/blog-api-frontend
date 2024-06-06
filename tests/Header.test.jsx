import { render } from "@testing-library/react";
import { Header } from "../src/components/Header";

describe("renders Header component", () => {
  it("render the menu", () => {
    const { getByText } = render(<Header />);
    const logoElement = getByText("Blog");
    const menuElement = getByText("Write");
    expect(logoElement).toBeInTheDocument();
    expect(menuElement).toBeInTheDocument();
  });
});
