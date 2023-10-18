"use server";

import userUrlStore from "@/store/url.store";
import { revalidatePath } from "next/cache";

export async function deleteAll() {
  "use server";

  userUrlStore.getState().removeUrls();

  revalidatePath("/");
}
