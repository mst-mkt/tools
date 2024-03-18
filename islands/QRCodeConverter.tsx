import { useSignal } from "@preact/signals";
import { TextInput } from "../components/common/TextInput.tsx";
import { useMemo } from "preact/hooks";
import { encode, renderSVG, renderUnicode } from "uqr";
import { JSX } from "preact/jsx-runtime";

export const QRCodeConverter = () => {
  const text = useSignal("");

  const qrcodeArray = useMemo<boolean[][]>(() => {
    return encode(text.value).data;
  }, [text.value, encode]);

  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    text.value = e.currentTarget.value;
  };

  const handleDownload = () => {
    const qrcodeSvg = renderSVG(text.value);
    const qrcodeBlob = new Blob([qrcodeSvg], { type: "image/svg+xml" });
    const qrcodeBlobUrl = URL.createObjectURL(qrcodeBlob);

    const qrcodeImage = new Image();
    qrcodeImage.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = qrcodeImage.width;
      canvas.height = qrcodeImage.height;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(qrcodeImage, 0, 0);
        const qrcodePng = canvas.toDataURL("image/png");
        const qrcodeLink = document.createElement("a");
        qrcodeLink.href = qrcodePng;
        qrcodeLink.download = `qrcode-${text.value}.png`;
        qrcodeLink.click();
      }

      URL.revokeObjectURL(qrcodeBlobUrl);
    };
    qrcodeImage.src = qrcodeBlobUrl;
  };

  const handleCopy = () => {
    const qrcodeUnicode = renderUnicode(text.value);
    navigator.clipboard.writeText(qrcodeUnicode);
  };

  return (
    <>
      <TextInput
        value={text.value}
        onChange={handleInput}
        label="変換する文字やリンクを入力"
      />
      <p class="text-sm pt-4">出力</p>
      <div
        class="grid p-2 rounded-lg border"
        style={{ gridTemplateColumns: `repeat(${qrcodeArray.length}, 1fr)` }}
      >
        {qrcodeArray.map((row, i) => (
          row.map((cell, j) => (
            <div
              class={`w-full aspect-square ${cell ? "bg-black" : "bg-white"}`}
              key={`${i}-${j}`}
            />
          ))
        ))}
      </div>
      <div class="flex gap-x-2 py-2">
        <button
          type="button"
          onClick={handleDownload}
          class="bg-sky-500 hover:bg-sky-600 transition-colors py-2 px-4 rounded-lg self-start text-sm text-white outline-0 ring-offset-2 focus-visible:ring-2 ring-sky-500 font-bold"
        >
          ダウンロード
        </button>
        <button
          type="button"
          onClick={handleCopy}
          class="bg-sky-500 hover:bg-sky-600 transition-colors py-2 px-4 rounded-lg self-start text-sm text-white outline-0 ring-offset-2 focus-visible:ring-2 ring-sky-500 font-bold"
        >
          文字としてコピー
        </button>
      </div>
    </>
  );
};
