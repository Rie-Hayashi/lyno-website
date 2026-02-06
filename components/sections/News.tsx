// components/sections/News.tsx
import { getNews } from "@/lib/data/news";
import NewsClient from "./NewsClient";

export default async function News() {
  const items = await getNews();
  return <NewsClient items={items} />;
}