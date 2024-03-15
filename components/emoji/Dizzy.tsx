import { JSX } from "preact/jsx-runtime";

export const EmojiDizzy = (
  emojiProps: Omit<JSX.IntrinsicElements["img"], "src" | "alt">,
) => {
  return (
    <img
      {...emojiProps}
      src="https://cdn.jsdelivr.net/npm/twemoji@11.3.0/2/svg/1f4ab.svg"
      alt="💫 (Dizzy Emoji)"
    />
  );
};
