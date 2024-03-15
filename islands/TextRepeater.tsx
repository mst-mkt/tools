import { useSignal } from "@preact/signals";
import { TextArea } from "../components/common/TextArea.tsx";
import { RangeInput } from "../components/common/RangeInput.tsx";
import { NumberInput } from "../components/common/NumberInput.tsx";
import { JSX } from "preact/jsx-runtime";

export const TextRepeater = () => {
  const input = useSignal("");
  const count = useSignal(1);
  const repeatedText = input.value.repeat(count.value);

  const handleInput = (e: JSX.TargetedEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    input.value = target.value;
  };

  const handleRange = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    count.value = Number(target.value);
  };

  return (
    <>
      <TextArea
        onInput={handleInput}
        value={input.value}
        placeholder="文字を入力"
      />
      <div class="grid grid-cols-2 gap-x-2 gap-y-1 max-[320px]:grid-cols-1">
        <label class="text-sm font-medium col-span-full">
          反復回数
        </label>
        <RangeInput
          min="1"
          max="100"
          value={count.value}
          onInput={handleRange}
        />
        <NumberInput
          value={count.value}
          onInput={handleRange}
        />
      </div>
      <TextArea
        value={repeatedText}
        placeholder="反復された文字列"
        readonly
      />
    </>
  );
};
