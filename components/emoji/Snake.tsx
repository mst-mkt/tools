import { JSX } from "preact/jsx-runtime";

export const EmojiSnake = (
  emojiProps: Omit<JSX.IntrinsicElements["img"], "src" | "alt">,
) => {
  return (
    <img
      {...emojiProps}
      src="https://cdn.jsdelivr.net/npm/twemoji@11.3.0/2/svg/1f40d.svg"
      alt="🐍 (Snake Emoji)"
    />
  );
};
