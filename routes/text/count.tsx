import { Head } from "$fresh/runtime.ts";
import { PageTitle } from "../../components/common/PageTitle.tsx";
import { TextCounter } from "../../islands/TextCounter.tsx";

const Count = () => {
  return (
    <>
      <Head>
        <title>TextCounter</title>
      </Head>
      <div class="flex flex-col gap-y-2">
        <PageTitle title="文字数カウント" />
        <TextCounter />
      </div>
    </>
  );
};

export default Count;
