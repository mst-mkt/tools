import { type PageProps } from "$fresh/server.ts";
import { Header } from "../components/layout/Header.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>tools</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="flex flex-col gap-y-8 max-w-screen-sm mx-auto p-6">
        <Header />
        <Component />
      </body>
    </html>
  );
}
