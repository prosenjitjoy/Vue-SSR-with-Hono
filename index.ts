import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { compress } from 'hono/compress'
import { readFileSync } from 'node:fs'
import { HTTPException } from 'hono/http-exception'

const port = 3000
const templateHtml = readFileSync('./index.html', 'utf-8')

const app = new Hono()
app.use(compress())
app.use('*', serveStatic({ root: './dist/client' }))
app.use('*', async (c, next) => {
  try {
    const url = c.req.path
    console.log(url)
    let template = templateHtml
    let render = (await import('./dist/server/entry-server.js')).render
    const rendered = await render(url)
    // console.log(rendered)
    const html = template
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '')
    return c.html(html);
  } catch (e) {
    throw new HTTPException(500, { message: "InternalError", cause: e })
  }
})


serve({
  fetch: app.fetch,
  port: port
})

console.log(`Server is running on http://localhost:${port}`)
