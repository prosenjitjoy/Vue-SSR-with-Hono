import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { render } from "./entry-server"

const templateHtml = `<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite + Vue + TS</title>
  <!--app-head-->
  <script type="module" crossorigin src="/index.js"></script>
  <link rel="stylesheet" crossorigin href="/index.css">
</head>

<body>
  <div id="app"><!--app-html--></div>
</body>

</html>`

const app = new Hono()

app.get('/', async (c) => {
  try {
    const url = c.req.path

    const rendered = await render(url)
    const html = templateHtml.replace(`<!--app-html-->`, rendered.html ?? '')

    return c.html(html);
  } catch (e) {
    throw new HTTPException(500, { message: "InternalError", cause: e })
  }
})

export default app
