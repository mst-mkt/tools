import { Head } from "$fresh/runtime.ts";
import { PageTitle } from "../../components/common/PageTitle.tsx";
import { ClipboardChecker } from "../../islands/ClipboardChecker.tsx";

const Replace = () => {
  return (
    <>
      <Head>
        <title>Clipboard Checker</title>
      </Head>
      <div class="flex flex-col gap-y-4">
        <PageTitle title="クリップボード 内容確認" />
        <ClipboardChecker />
      </div>
    </>
  );
};

export default Replace;
