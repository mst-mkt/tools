import { LinkCard } from "../components/common/LinkCard.tsx";
import { SectionTitle } from "../components/common/SectionTitle.tsx";
import { EmojiChineFlag } from "../components/emoji/ChinaFlag.tsx";
import { EmojiNotePad } from "../components/emoji/NotePad.tsx";

export default function Home() {
  return (
    <div>
      <section class="flex flex-col gap-y-2">
        <SectionTitle title="Text" />
        <LinkCard
          href="/text/counter"
          title="文字数カウント"
          Emoji={EmojiNotePad}
        />
        <LinkCard
          href="/text/cjp"
          title="怪レい日本语"
          Emoji={EmojiChineFlag}
        />
      </section>
    </div>
  );
}
