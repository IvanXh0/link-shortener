import { rest } from "msw";

export const handlers = [
  rest.post("https://cleanuri.com/api/v1/shorten", (req, res, ctx) => {
    return res(
      ctx.json({ result_url: "https://example.com/shortened" }),
      ctx.status(200),
    );
  }),
];
