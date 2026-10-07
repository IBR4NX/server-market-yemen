import { Router, Request, Response } from "express";
import pool from "../../database";
import { BASE_URL } from "../../config";

const router = Router();
type SitemapUrl = {
  url: string;
  lastmod?: string | Date | null;
  priority: string;
};

router.get(":sender", async (_req: Request, res: Response) => {
  try {
    
    const MAP_URL = `https://${(_req.params.sender as string) ?? BASE_URL}`;
    console.log(MAP_URL);
    const [cities, products, categories] = await Promise.all([
      pool.query(`
        SELECT id,name, updated_at
        FROM cities
        WHERE is_active = true
      `),

      pool.query(`
        SELECT id,name, updated_at
        FROM products
        WHERE is_active = true
      `),

      pool.query(`
        SELECT id,name, updated_at
        FROM categories
        WHERE is_active = true
      `),
    ]);

    const urls: SitemapUrl[] = [
      {
        url: "/",
        priority: "1.0",
      },
      {
        url: "/prices",
        priority: "0.9",
      },
      {
        url: "/about",
        priority: "0.5",
      },

      ...cities.rows.map((city) => ({
        url: `/city/${city.name}`,
        lastmod: city.updated_at,
        priority: "0.8",
      })),

      ...products.rows.map((product) => ({
        url: `/product/${product.name}`,
        lastmod: product.updated_at,
        priority: "0.8",
      })),

      ...categories.rows.map((category) => ({
        url: `/category/${category.name}`,
        lastmod: category.updated_at,
        priority: "0.7",
      })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${urls
  .map(
    ({ url, lastmod, priority }) => `
  <url>
    <loc>${MAP_URL}${url}</loc>
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
