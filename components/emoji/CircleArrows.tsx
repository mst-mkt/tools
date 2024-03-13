import { JSX } from "preact/jsx-runtime";

export const EmojiCircleArrows = (
  emojiProps: Omit<JSX.IntrinsicElements["img"], "src" | "alt">,
) => {
  return (
    <img
      {...emojiProps}
      src="https://cdn.jsdelivr.net/npm/twemoji@11.3.0/2/svg/1f501.svg"
      alt="🔁 (Circled Arrows Emoji)"
    />
  );
};
