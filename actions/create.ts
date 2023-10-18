"use server";

import userUrlStore from "@/store/url.store";
import { revalidatePath } from "next/cache";

export async function create(formData: FormData) {
  "use server";

  const url = formData.get("url") as string;

  try {
    const res = await fetch("https://cleanuri.com/api/v1/shorten", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();

      userUrlStore.getState().addUrl(data.result_url);

      revalidatePath("/");
    } else {
      console.error("Failed to shorten the URL");
    }
  } catch (error) {
    console.log(error);
  }
}
