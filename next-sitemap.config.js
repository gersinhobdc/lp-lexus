/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://lexusbr.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
  },
  changefreq: "monthly",
  priority: 0.7,
  sitemapSize: 5000,
};
