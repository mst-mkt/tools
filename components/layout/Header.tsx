import { EmojiYarn } from "../emoji/Yarn.tsx";

export const Header = () => {
  return (
    <header class="flex items-center gap-x-4">
      <EmojiYarn width="32" height="32" />
      <h1 class="text-2xl">Tools</h1>
    </header>
  );
};
