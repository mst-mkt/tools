import { Head } from "$fresh/runtime.ts";
import { TextCounter } from "../../islands/TextCounter.tsx";

const Counter = () => {
  return (
    <>
      <Head>
        <title>TextCounter</title>
      </Head>
      <div class="flex flex-col gap-y-2">
        <h2>文字数カウンター</h2>
        <TextCounter />
      </div>
    </>
  );
};

export default Counter;
