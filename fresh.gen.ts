// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $index from "./routes/index.tsx";
import * as $text_cjp from "./routes/text/cjp.tsx";
import * as $text_count from "./routes/text/count.tsx";
import * as $text_repeat from "./routes/text/repeat.tsx";
import * as $text_replace from "./routes/text/replace.tsx";
import * as $CJPConverter from "./islands/CJPConverter.tsx";
import * as $TextCounter from "./islands/TextCounter.tsx";
import * as $TextRepeater from "./islands/TextRepeater.tsx";
import * as $TextReplacer from "./islands/TextReplacer.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/index.tsx": $index,
    "./routes/text/cjp.tsx": $text_cjp,
    "./routes/text/count.tsx": $text_count,
    "./routes/text/repeat.tsx": $text_repeat,
    "./routes/text/replace.tsx": $text_replace,
  },
  islands: {
    "./islands/CJPConverter.tsx": $CJPConverter,
    "./islands/TextCounter.tsx": $TextCounter,
    "./islands/TextRepeater.tsx": $TextRepeater,
    "./islands/TextReplacer.tsx": $TextReplacer,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
