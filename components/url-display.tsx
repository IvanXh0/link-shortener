import userUrlStore from "@/store/url.store";

export default async function UrlDisplay() {
  const urls = userUrlStore.getState().getUrls();
  return (
    <div className="flex flex-col p-15 font-bold text-xl">
      {urls.map((url) => (
        <p key={url}>{url}</p>
      ))}
    </div>
  );
}
