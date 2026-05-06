import rss from "@astrojs/rss";
import { getAllPublished } from "../../utils/cluster";
import { SITE } from "../../config";

export async function GET(context: { site: URL }) {
  const posts = await getAllPublished();
  return rss({
    title: `${SITE.name} | Writing`,
    description: "Lead generation and AI for B2B founders, in plain English.",
    site: context.site?.toString() ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `/writing/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
