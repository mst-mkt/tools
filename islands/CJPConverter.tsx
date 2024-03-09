import { useSignal } from "@preact/signals";
import { generate } from "cjp";
import { TextArea } from "../components/common/TextArea.tsx";
import { JSX } from "preact/jsx-runtime";

export const CJPConverter = () => {
  const input = useSignal("");
  const cjpText = generate(input.value);

  const handleInput = (e: JSX.TargetedEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    input.value = target.value;
  };

  return (
    <>
      <section>
        <h3 class="py-2">変換前</h3>
        <TextArea
          onInput={handleInput}
          value={input.value}
        />
      </section>
      <section>
        <h3 class="py-2">変換後</h3>
        <TextArea
          value={cjpText}
          readonly
        />
      </section>
    </>
  );
};
