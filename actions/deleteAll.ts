"use server";

import userUrlStore from "@/store/url.store";
import { revalidatePath } from "next/cache";

export async function deleteAll() {
  userUrlStore.getState().removeUrls();

  revalidatePath("/");
}
