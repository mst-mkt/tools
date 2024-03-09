import { Head } from "$fresh/runtime.ts";
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
        <h2>怪レい日本语</h2>
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
