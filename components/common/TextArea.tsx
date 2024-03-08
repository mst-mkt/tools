import { JSX } from "preact/jsx-runtime";

export const TextArea = (textAreaProps: JSX.IntrinsicElements["textarea"]) => {
  return (
    <textarea
      {...textAreaProps}
      class="w-full min-h-32 resize-none p-2 text-xs border rounded-lg outline-0 ring-offset-2 focus-visible:ring-2"
    />
  );
};
