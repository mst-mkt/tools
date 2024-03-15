import { Head } from "$fresh/runtime.ts";
import { PageTitle } from "../../components/common/PageTitle.tsx";
import { TextRepeater } from "../../islands/TextRepeater.tsx";

const Repeat = () => {
  return (
    <>
      <Head>
        <title>TextRepeater</title>
      </Head>
      <div class="flex flex-col gap-y-4">
        <PageTitle title="文字列反復" />
        <TextRepeater />
      </div>
    </>
  );
};

export default Repeat;
