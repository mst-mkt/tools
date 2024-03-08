import { FunctionComponent } from "https://esm.sh/v128/preact@10.19.2/src/index.js";
import { JSX } from "preact/jsx-runtime";

type LinkCardProps = {
  href: string;
  title: string;
  Emoji: FunctionComponent<Omit<JSX.IntrinsicElements["img"], "src" | "alt">>;
};

export const LinkCard = ({ href, title, Emoji }: LinkCardProps) => {
  return (
    <a href={href} class="block">
      <div class="flex items-center gap-x-4 p-6 rounded-xl border shadow-sm hover:shadow-sky-200 transition-shadow">
        <Emoji width={32} height={32} />
        <h3 class="text-lg font-normal truncate">{title}</h3>
      </div>
    </a>
  );
};
