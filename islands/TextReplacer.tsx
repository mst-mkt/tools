import { useSignal } from "@preact/signals";
import { TextArea } from "../components/common/TextArea.tsx";
import { JSX } from "preact/jsx-runtime";
import { useMemo } from "preact/hooks";
import { TextInput } from "../components/common/TextInput.tsx";
import IconTrash from "$tabler-icons-tsx/tsx/trash.tsx";
import IconPlus from "$tabler-icons-tsx/tsx/plus.tsx";

type ReplaceMapping = {
  id: ReturnType<typeof crypto.randomUUID>;
  from: string;
  to: string;
};

const RuleItem = (
  { from, to, handleInput, removeRule, buttonDisabled }: {
    from: string;
    to: string;
    handleInput: (
      e: JSX.TargetedEvent<HTMLInputElement>,
      fromOrTo: "from" | "to",
    ) => void;
    removeRule: () => void;
    buttonDisabled: boolean;
  },
) => {
  return (
    <div class="flex gap-x-2">
      <TextInput
        value={from}
        placeholder="from"
        onChange={(e: JSX.TargetedEvent<HTMLInputElement>) =>
          handleInput(e, "from")}
      />
      <TextInput
        value={to}
        placeholder="to"
        onChange={(e: JSX.TargetedEvent<HTMLInputElement>) =>
          handleInput(e, "to")}
      />
      <button
        type="button"
        onClick={removeRule}
        disabled={buttonDisabled}
        class="bg-red-600 hover:bg-red-500 disabled:bg-stone-500 transition-colors p-2 rounded-lg outline-0 ring-offset-2 focus-visible:ring-2 ring-red-500"
      >
        <IconTrash class="size-4 text-white" />
      </button>
    </div>
  );
};

export const TextReplacer = () => {
  const text = useSignal("");
  const replaceMapping = useSignal<ReplaceMapping[]>([...Array(3)].map(() => (
    { id: crypto.randomUUID(), from: "", to: "" }
  )));

  const addRule = () => {
    replaceMapping.value = [
      ...replaceMapping.value,
      { id: crypto.randomUUID(), from: "", to: "" },
    ];
  };

  const removeRule = (id: ReplaceMapping["id"]) => {
    if (replaceMapping.value.length <= 1) return;
    replaceMapping.value = replaceMapping.value.filter((_) => _.id !== id);
  };

  const handleInput = {
    textarea: (e: JSX.TargetedEvent<HTMLTextAreaElement>) => {
      const target = e.target as HTMLTextAreaElement;
      text.value = target.value;
    },
    rule: (
      e: JSX.TargetedEvent<HTMLInputElement>,
      id: ReplaceMapping["id"],
      fromOrTo: "from" | "to",
    ) => {
      const target = e.target as HTMLInputElement;
      replaceMapping.value = replaceMapping.value.map((rule) => (
        rule.id === id ? { ...rule, [fromOrTo]: target.value } : rule
      ));
    },
  };

  const replacedText = useMemo(() => {
    const replaced = replaceMapping.value.reduce((acc, rule) => (
      acc.replaceAll(rule.from, rule.to)
    ), text.value);
    return replaced;
  }, [replaceMapping.value, text.value]);

  return (
    <div class="flex flex-col gap-y-4">
      <TextArea
        onInput={handleInput.textarea}
        value={text.value}
        placeholder="置換前"
      />
      <div class="flex flex-col gap-y-2">
        {replaceMapping.value.map((rule) => (
          <RuleItem
            key={rule.id}
            from={rule.from}
            to={rule.to}
            handleInput={(
              e: JSX.TargetedEvent<HTMLInputElement>,
              fromOrTo: "from" | "to",
            ) => handleInput.rule(e, rule.id, fromOrTo)}
            removeRule={() => removeRule(rule.id)}
            buttonDisabled={replaceMapping.value.length <= 1}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={addRule}
        class="flex gap-x-1 items-center text-white font-bold self-center bg-sky-400 hover:bg-sky-500 transition-colors py-1 px-2 outline-0 rounded ring-offset-2 focus-visible:ring-2 ring-sky-500"
      >
        <IconPlus class="size-5" />
        ルールを追加
      </button>
      <TextArea
        value={replacedText}
        placeholder="置換後"
        readonly
      />
    </div>
  );
};
