import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";
import { handlers } from "../mocks";
import { setupServer } from "msw/native";
import { create } from "domain";

describe("It renders the homepage", () => {
  beforeAll(() => {
    setupServer(...handlers).listen();
  });

  afterEach(() => {
    setupServer(...handlers).resetHandlers();
  });

  afterAll(() => {
    setupServer(...handlers).close();
  });

  it("should render the homepage", async () => {
    const HomeResolved = await Home();

    render(HomeResolved);

    expect(screen.getByText("Enter a URL to shorten it")).toBeInTheDocument();
  });

  it("should render data from the api", async () => {
    const HomeResolved = await Home();

    render(HomeResolved);

    const inputField = screen.getByTestId("url-input");
    const submitBtn = screen.getByTestId("submit");

    expect(inputField).toBeInTheDocument();

    fireEvent.change(inputField, { target: { value: "https://google.com" } });

    // submitBtn.onclick = () => create(new FormData(screen.getByTestId("form")));

    // fireEvent.submit(screen.getByTestId("submit"));

    await waitFor(() => {
      expect(screen.getByText("Shortened urls")).toBeInTheDocument();
    });
  });
});
