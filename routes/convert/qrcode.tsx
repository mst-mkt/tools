import { Head } from "$fresh/runtime.ts";
import { PageTitle } from "../../components/common/PageTitle.tsx";
import { QRCodeConverter } from "../../islands/QRCodeConverter.tsx";

const QRCode = () => {
  return (
    <>
      <Head>
        <title>
          Convert to QRCode
        </title>
      </Head>
      <div class="flex flex-col gap-y-2">
        <PageTitle title="QRCode" />
        <QRCodeConverter />
      </div>
    </>
  );
};

export default QRCode;
