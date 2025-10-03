import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://savewithliquid.com";
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/api", "/auth?*"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
