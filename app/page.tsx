import { create } from "@/actions/create";
import { deleteAll } from "@/actions/deleteAll";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UrlDisplay from "@/components/url-display";
import userUrlStore from "@/store/url.store";

export default async function Home() {
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
