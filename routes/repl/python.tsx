import { Head } from "$fresh/runtime.ts";
import { PageTitle } from "../../components/common/PageTitle.tsx";

const PythonRepl = () => {
  return (
    <>
      <Head>
        <title>Python Repl</title>
      </Head>
      <div class="flex flex-col gap-y-2">
        <PageTitle title="Python Repl" />
      </div>
    </>
  );
};

export default PythonRepl;
