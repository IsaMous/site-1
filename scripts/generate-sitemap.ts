import { SitemapStream, streamToPromise } from "sitemap"
import { createWriteStream } from "node:fs"

const siteUrl = "https://site-isa-1-olive.vercel.app/"

const routes = [
  "/",
  "/portfolio",
  "/partenaires",
  "/contact"
]

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: siteUrl })
  const writeStream = createWriteStream("./dist/sitemap.xml")

  sitemap.pipe(writeStream)

  routes.forEach((route) => {
    sitemap.write({
      url: route,
      changefreq: "weekly",
      priority: route === "/" ? 1.0 : 0.8,
    })
  })

  sitemap.end()

  await streamToPromise(sitemap)
  console.log("> sitemap.xml generated")
}

generateSitemap()
