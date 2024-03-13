import { Head } from "$fresh/runtime.ts";
import { PageTitle } from "../../components/common/PageTitle.tsx";
import { TextReplacer } from "../../islands/TextReplacer.tsx";

const Replace = () => {
  return (
    <>
      <Head>
        <title>TextReplacer</title>
      </Head>
      <div class="flex flex-col gap-y-2">
        <PageTitle title="文字置換" />
        <TextReplacer />
      </div>
    </>
  );
};

export default Replace;
