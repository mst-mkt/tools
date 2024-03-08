import { type PageProps } from "$fresh/server.ts";
import { Header } from "../components/layout/Header.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>tools</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="max-w-screen-sm mx-auto p-4">
        <Header />
        <Component />
      </body>
    </html>
  );
}
