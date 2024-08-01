import { LinkCard } from "../components/common/LinkCard.tsx";
import { SectionTitle } from "../components/common/SectionTitle.tsx";
import { EmojiChineFlag } from "../components/emoji/ChinaFlag.tsx";
import { EmojiCircleArrows } from "../components/emoji/CircleArrows.tsx";
import { EmojiDizzy } from "../components/emoji/Dizzy.tsx";
import { EmojiLink } from "../components/emoji/Link.tsx";
import { EmojiNotePad } from "../components/emoji/NotePad.tsx";

export default function Home() {
  return (
    <div class="flex flex-col gap-4">
      <section class="flex flex-col gap-y-2">
        <SectionTitle title="Text" />
        <LinkCard
          href="/text/count"
          title="文字数カウント"
          Emoji={EmojiNotePad}
        />
        <LinkCard
          href="/text/replace"
          title="文字置換"
          Emoji={EmojiCircleArrows}
        />
        <LinkCard
          href="/text/repeat"
          title="文字列反復"
          Emoji={EmojiDizzy}
        />
      </section>
      <section class="flex flex-col gap-y-2">
        <SectionTitle title="Convert" />
        <LinkCard
          href="/convert/cjp"
          title="怪レい日本語"
          Emoji={EmojiChineFlag}
        />
        <LinkCard
          href="/convert/qrcode"
          title="QRCode"
          Emoji={EmojiLink}
        />
      </section>
      <section class="flex flex-col gap-y-2">
        <SectionTitle title="Web" />
        <LinkCard
          href="/web/clipboard"
          title="クリップボード"
          Emoji={EmojiNotePad}
        />
      </section>
    </div>
  );
}
