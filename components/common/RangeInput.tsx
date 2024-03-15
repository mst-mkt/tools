import { JSX } from "preact/jsx-runtime";

export const RangeInput = (
  props: Omit<JSX.IntrinsicElements["input"], "type">,
) => {
  return (
    <div class="flex w-full items-center border rounded-lg p-4 has-[:focus-visible]:ring-2 ring-offset-2 ring-sky-400">
      <input
        {...props}
        class={`w-full h-2 appearance-none cursor-pointer rounded-lg outline-0 bg-sky-200
               [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none
               [&::-webkit-slider-thumb]:size-2 [&::-moz-range-thumb]:size-2
               [&::-webkit-slider-thumb]:rounded-full [&::-moz-range-thumb]:rounded-full
               [&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:bg-white
               [&::-webkit-slider-thumb]:ring-4 [&::-moz-range-thumb]:ring-4
               [&::-webkit-slider-thumb]:ring-sky-500 [&::-moz-range-thumb]:ring-sky-500
               [&::-moz-focus-outer]:border-0
               ${props.class}`}
        type="range"
      />
    </div>
  );
};
