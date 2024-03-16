import { Head } from "$fresh/runtime.ts";
import { PageTitle } from "../../components/common/PageTitle.tsx";
import { CJPConverter } from "../../islands/CJPConverter.tsx";

const CJP = () => {
  return (
    <>
      <Head>
        <title>
          Convert to Correct-JP
        </title>
      </Head>
      <div class="flex flex-col gap-y-2">
        <PageTitle title="怪レい日本语" />
        <CJPConverter />
        <p class="text-xs">
          怪レい日本语 is converted by{" "}
          <a
            href="https://www.npmjs.com/package/cjp"
            class="text-sky-500 hover:underline"
          >
            npm:cjp
          </a>
        </p>
      </div>
    </>
  );
};

export default CJP;
