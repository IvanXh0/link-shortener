import userUrlStore from "@/store/url.store";
import QRCode from "react-qr-code";

export default function UrlDisplay() {
  return (
    <div className="flex flex-col p-15 font-bold text-xl">
      {userUrlStore
        .getState()
        .getUrls()
        .map((url, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <a href={url} target="_blank">
              {url}
            </a>
            <QRCode
              data-testid="qr-code"
              value={url}
              size={200}
              className="mt-5"
              bgColor="white"
            />
          </div>
        ))}
    </div>
  );
}
