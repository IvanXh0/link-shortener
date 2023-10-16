import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log(body);

    const { url } = body;

    const response = await fetch("https://cleanuri.com/api/v1/shorten", {
      method: "POST",
      body: JSON.stringify({
        url,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return Response.json({
      data: await response.json(),
    });
  } catch (err) {
    console.log(err);
  }
}
