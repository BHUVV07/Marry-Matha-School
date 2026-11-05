import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://marymathaschool.edu.in";
  const currentDate = new Date();

  const routes = [
    "",
    "/about",
    "/academics",
    "/facilities",
    "/faculty",
    "/gallery",
    "/events",
    "/admissions",
    "/contact",
    "/parent",
    "/student",
    "/teacher",
    "/principal",
    "/admin",
    "/accountant",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === "" || route === "/events" ? "daily" : "weekly",
    priority:
      route === ""
        ? 1.0
        : route === "/admissions"
        ? 0.9
        : route.startsWith("/parent") || route.startsWith("/student")
        ? 0.5
        : 0.8,
  }));
}

