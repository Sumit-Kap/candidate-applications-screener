import { render, screen, act } from "@testing-library/react";
import Homepage from "../Homepage";
import { users } from "../../__mocks__/users";
import { BrowserRouter } from "react-router-dom";
import { cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
describe("Homepage", () => {
  beforeEach(() => {
    global.fetch = () => {
      return Promise.resolve({
        json: () => users.getUser(),
      });
    };
  });
  afterEach(cleanup);
  test("renders the loader component", async () => {
    const container = await render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );
    const loader = screen.getByTestId("image-loader");
    expect(loader).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
  test("On Success 200 response from API validate if table and filter component got rendered successfully or not", async () => {
    const { container, getByTestId } = await render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );
    await waitFor(
      () => expect(getByTestId("applicants-filter")).toBeInTheDocument
    );
    await waitFor(() => expect(getByTestId("applicants-table")).toBeDefined());
    expect(container).toMatchSnapshot();
  });

  test("search for applicant in the list table", async () => {
    const { container } = await render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    await waitFor(() => {
      userEvent.type(screen.getByPlaceholderText("Search...."), "Larry");
      const searchBtn = screen.getByRole("button", { name: "Search" });
      userEvent.click(searchBtn);
      expect(screen.getByText("Larry Bruen")).toBeDefined();
    });

    expect(container).toMatchSnapshot();
  });
});
