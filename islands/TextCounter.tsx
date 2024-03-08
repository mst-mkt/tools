import { useSignal } from "@preact/signals";
import { TextArea } from "../components/common/TextArea.tsx";
import { JSX } from "preact/jsx-runtime";

export const TextCounter = () => {
  const text = useSignal("");

  const handleInput = (e: JSX.TargetedEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    text.value = target.value;
  };

  const countText = (text: string) => {
    const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
    const segments = segmenter.segment(text);
    return [...segments].length;
  };

  const countWords = (text: string) => {
    if (text.trim() === "") return 0;
    return text.split(/\s+/).filter((word) => word.trim() !== "").length;
  };

  return (
    <>
      <TextArea
        onInput={handleInput}
        value={text.value}
      />
      <div class="py-4">
        <p>文字数: {countText(text.value)}</p>
        <p>
          文字数 (空白, 改行抜き): {countText(
            text.value.replace(/\s/g, ""),
          )}
        </p>
        <p>単語数: {countWords(text.value)}</p>
        <p>行数: {text.value.split(/\n/).length}</p>
        <p>
          行数 (空行抜き):{" "}
          {text.value.split(/\n/).filter((line) => line.trim() !== "").length}
        </p>
        <p>
          バイト数: {new TextEncoder().encode(text.value).length}
        </p>
      </div>
    </>
  );
};
