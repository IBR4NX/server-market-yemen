import { Router, Request, Response } from "express";
import pool from "../../database";
import { BASE_URL } from "../../config";

const router = Router();
type SitemapUrl = {
  url: string;
  lastmod?: string | Date | null;
  priority: string;
};

router.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM get_current_prices(
        $1::text,
        $2::text,
        $3::text
      )
      `,
      [null, null, null],
    );

    const urls = result.rows.map((price) => ({
      url: `/city/${price.city_name.trim().replace(/\s+/g, "-")}/product/${price.product_name.trim().replace(/\s+/g, "-")}`,
      lastmod: price.updated_at,
      priority: "0.8",
    }));

    const uniqueUrls = Array.from(
      new Map(urls.map((item) => [item.url, item])).values(),
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${uniqueUrls
  .map(
    ({ url, lastmod, priority }) => `
  <url>
    <loc>${BASE_URL}${url}</loc>
    ${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ""}
    <changefreq>daily</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join("")}
</urlset>`;

    res.status(200).type("application/xml").send(xml);
  } catch (error) {
    console.error("Sitemap error:", error);

    res.status(500).send("Failed to generate sitemap");
  }
});

export default router;
