import { useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";
import { TextArea } from "../components/common/TextArea.tsx";

export const ClipboardChecker = () => {
  const [clipboardData, setClipboardData] = useState<Record<string, string>>(
    {}
  );

  const handlePaste: JSX.ClipboardEventHandler<HTMLTextAreaElement> = (e) => {
    e.preventDefault();
    const clipboardDataTypes = e.clipboardData?.types;
    const clipboardData = Object.fromEntries(
      clipboardDataTypes?.map((type) => [
        type,
        e.clipboardData?.getData(type) ?? "",
      ]) ?? []
    );

    setClipboardData(clipboardData);
  };

  return (
    <>
      <section>
        <TextArea
          value={clipboardData["text/plain"] ?? clipboardData.text ?? ""}
          onPaste={handlePaste}
          onInput={(e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
          }}
          placeholder="ここに貼り付け"
          readonly
        />
      </section>
      {Object.values(clipboardData).length > 0 && (
        <section class="flex flex-col gap-1">
          <h3>データ</h3>
          {Object.entries(clipboardData).map(([type, data]) => (
            <div key={type} class="flex flex-col gap-1">
              <h4>{type}</h4>
              <TextArea value={data} readOnly />
            </div>
          ))}
        </section>
      )}
    </>
  );
};
