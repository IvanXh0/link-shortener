import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UrlDisplay from "@/components/url-display";
import userUrlStore from "@/store/url.store";
import { revalidatePath } from "next/cache";

export default async function Home() {
  async function create(formData: FormData) {
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

  async function deleteAll() {
    "use server";

    userUrlStore.getState().removeUrls();

    revalidatePath("/");
  }
  return (
    <main className="flex flex-col items-center justify-center max-w-screen h-screen">
      <div>
        <h2 className="text-3xl font-bold p-5">Enter a URL to shorten it</h2>
        <form
          action={create}
          key={Math.random()}
          className="flex items-center align-center justify-center flex-col"
          data-testid="form"
        >
          <Input
            type="text"
            name="url"
            id="url"
            data-testid="url-input"
            defaultValue=""
          />
          <Button
            data-testid="submit"
            variant="default"
            className="p-5 mt-5 text-md"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
      <div className="flex flex-col items-center p-12">
        <h3>Shortened urls</h3>
        <UrlDisplay />
        {userUrlStore.getState().getUrls().length === 0 ? (
          <p className="text-xl font-semibold mt-5">No urls yet</p>
        ) : (
          <form className="mt-5 p-5" action={deleteAll}>
            <Button variant="destructive" type="submit">
              Delete History
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}
