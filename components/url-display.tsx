import userUrlStore from "@/store/url.store";

export default async function UrlDisplay() {
  return (
    <div className="flex flex-col p-15 font-bold text-xl">
      {userUrlStore
        .getState()
        .getUrls()
        .map((url, idx) => (
          <a key={idx} href={url} target="_blank">
            <p key={idx}>{url}</p>
          </a>
        ))}
    </div>
  );
}
