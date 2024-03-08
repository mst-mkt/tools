import { LinkCard } from "../components/common/LinkCard.tsx";
import { SectionTitle } from "../components/common/SectionTitle.tsx";
import { EmojiNotePad } from "../components/emoji/NotePad.tsx";

export default function Home() {
  return (
    <div>
      <section class="flex flex-col gap-y-2 py-8">
        <SectionTitle title="Text" />
        <LinkCard
          href="/text/counter"
          title="文字数カウント"
          Emoji={EmojiNotePad}
        />
      </section>
    </div>
  );
}
