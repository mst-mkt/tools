import { JSX } from "preact/jsx-runtime";

export const EmojiChineFlag = (
  emojiProps: Omit<JSX.IntrinsicElements["img"], "src" | "alt">,
) => {
  return (
    <img
      {...emojiProps}
      src="https://cdn.jsdelivr.net/npm/twemoji@11.3.0/2/svg/1f1e8-1f1f3.svg"
      alt="🇨🇳 (China Flag Emoji)"
    />
  );
};
