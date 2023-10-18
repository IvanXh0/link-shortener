import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";
import { handlers } from "../mocks";
import { setupServer } from "msw/native";
import { create } from "@/actions/create";

global.fetch = jest.fn();

jest.mock("next/cache", () => {
  return {
    revalidate: jest.fn(),
  };
});

describe("It renders the homepage", () => {
  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it("should render the homepage", async () => {
    const HomeResolved = await Home();

    render(HomeResolved);

    expect(screen.getByText("Enter a URL to shorten it")).toBeInTheDocument();
  });
  it("should send the post request and recieve accurate data", async () => {
    const mockResponse = {
      ok: true,
      json: () =>
        Promise.resolve({ result_url: "https://example.com/shortened" }),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const formData = new FormData();
    formData.append("url", "https://example.com");
    await create(formData);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://cleanuri.com/api/v1/shorten",
      {
        method: "POST",
        body: JSON.stringify({ url: "https://example.com" }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  });
  it("should fail with error", async () => {
    const mockResponse = {
      ok: false,
      json: () => Promise.resolve({}),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    const formData = new FormData();
    formData.append("url", "https://example.com");
    await create(formData);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://cleanuri.com/api/v1/shorten",
      {
        method: "POST",
        body: JSON.stringify({ url: "https://example.com" }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  });
});
