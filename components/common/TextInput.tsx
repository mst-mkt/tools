import { JSX } from "preact/jsx-runtime";

type InputProps = {
  label?: string;
};

export const TextInput = ({
  label,
  ...inputProps
}:
  & InputProps
  & Omit<JSX.IntrinsicElements["input"], "type" | keyof InputProps>) => {
  const Input = () => (
    <input
      type="text"
      {...inputProps}
      class="w-full p-2 text-xs border rounded-lg outline-0 ring-offset-2 focus-visible:ring-2"
    />
  );

  if (label === undefined) return <Input />;

  return (
    <label class="flex flex-col">
      <span class="mb-1 text-xs">{label}</span>
      <Input />
    </label>
  );
};
