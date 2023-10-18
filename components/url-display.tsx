import userUrlStore from "@/store/url.store";

export default function UrlDisplay() {
  return (
    <div className="flex flex-col p-15 font-bold text-xl">
      {userUrlStore
        .getState()
        .getUrls()
        .map((url, idx) => (
          <a key={idx} href={url} target="_blank">
            {url}
          </a>
        ))}
    </div>
  );
}
