// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $index from "./routes/index.tsx";
import * as $text_cjp from "./routes/text/cjp.tsx";
import * as $text_counter from "./routes/text/counter.tsx";
import * as $CJPConverter from "./islands/CJPConverter.tsx";
import * as $TextCounter from "./islands/TextCounter.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/index.tsx": $index,
    "./routes/text/cjp.tsx": $text_cjp,
    "./routes/text/counter.tsx": $text_counter,
  },
  islands: {
    "./islands/CJPConverter.tsx": $CJPConverter,
    "./islands/TextCounter.tsx": $TextCounter,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
