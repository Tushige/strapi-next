import { fetchAPI } from "./fetch-api";
import qs from "qs";
const BLOG_PAGE_SIZE = 3;
const BASE_URL = process.env.STRAPI_API_URL ?? "http://localhost:1337";

const homepageQuery = qs.stringify({
  populate: {
    sections: {
      on: {
        "sections.hero-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            logo: {
              populate: {
                image: {
                  fields: ["url", "alternativeText"],
                },
              },
            },
            cta: true,
          },
        },
        "sections.info-section": {
          populate: {
            image: {
              fields: ["url", "alternativeText"],
            },
            cta: true,
          },
        },
      },
    },
  },
});
export async function getHomePage() {
  const path = "/api/home-page";
  const url = new URL(path, BASE_URL);
  url.search = homepageQuery;
  return fetchAPI(url.href, { method: "GET" });
}
