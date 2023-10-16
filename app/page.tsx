"use client";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await axios.post("api/link-shortener", {
      url: new URL(url).href,
    });

    console.log(response);
  };
  return (
    <main>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={url}
            name="long"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
