import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";
import { handlers } from "../mocks";
import { setupServer } from "msw/native";
import { create } from "@/actions/create";
import { deleteAll } from "@/actions/deleteAll";
import userUrlStore from "@/store/url.store";

global.fetch = jest.fn();

jest.mock("next/cache", () => {
  return {
    revalidatePath: jest.fn(),
  };
});

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Homepage", () => {
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

    expect(userUrlStore.getState().getUrls()).toContain(
      "https://example.com/shortened",
    );

    expect(require("next/cache").revalidatePath).toHaveBeenCalledWith("/");
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
    expect(userUrlStore.getState().getUrls()).not.toContain(
      "https://example.com",
    );
  });
  it("should render the response on page", async () => {
    const HomeResolved = await Home();

    render(HomeResolved);

    const input = screen.getByTestId("url-input");

    fireEvent.change(input, { target: { value: "https://example.com" } });

    const button = screen.getByTestId("submit");

    fireEvent.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("https://example.com/shortened"),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: "Delete History" }),
      ).toBeInTheDocument();

      expect(userUrlStore.getState().getUrls()).toContain(
        "https://example.com/shortened",
      );

      expect(require("next/cache").revalidatePath).toHaveBeenCalledWith("/");
    });
  });
  it("should delete all urls", async () => {
    const HomeResolved = await Home();

    render(HomeResolved);

    const button = screen.getByRole("button", { name: "Delete History" });

    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    await waitFor(async () => {
      await deleteAll();
      expect(userUrlStore.getState().getUrls()).toHaveLength(0);
    });
  });
});
