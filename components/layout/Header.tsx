import { EmojiYarn } from "../emoji/Yarn.tsx";
import IconBrandGithubFilled from "$tabler-icons-tsx/tsx/brand-github-filled.tsx";

export const Header = () => {
  return (
    <header class="flex items-center gap-x-4">
      <a href="/" class="contents">
        <EmojiYarn width="32" height="32" />
        <h1 class="text-2xl flex-grow flex-shrink truncate">Tools</h1>
      </a>
      <a
        href="http://github.com/mst-mkt/tools"
        class="hover:bg-neutral-200 transition-colors p-2 rounded-lg"
      >
        <IconBrandGithubFilled class="w-6 h-6" />
      </a>
    </header>
  );
};
