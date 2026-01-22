import { account, database } from "@/lib/appwrite";
import { useState } from "react";
import { Query } from "react-native-appwrite";

interface fetchNews {
  $id: string;
  sourceName: string;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  category: string;
}

function useNews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [news, setNews] = useState<fetchNews[]>([]);

  const generalnews = async () => {
    setLoading(true);
    setError("");
    try {
      await account.get();

      const res = await database.listDocuments("001", "news", [
        Query.orderDesc("publishedAt"),
        Query.limit(100),
      ]);
      setNews(res.documents as fetchNews[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch news");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  const selectedNews = async () => {
    setLoading(true);
    setError("");
    try {
      const user = await account.get();
      let categories: string[] = [];
      try {
        const categoryDoc = await database.getDocument(
          "001",
          "categories",
          user.$id,
        );

        categories = categoryDoc.newsCategories as string[];
      } catch (err) {
        setError(
          "Select at least one news category for your newsfeed. Go to setting to select a category",
        );
        setNews([]);
        return;
      }

      if (!categories || categories.length === 0) {
        setError(
          "Select at least one news category for your newsfeed. Go to setting to select a category",
        );
        setNews([]);
        return;
      }

      let allNews: fetchNews[] = [];

      for (const cat of categories) {
        const res = await database.listDocuments("001", "news", [
          Query.equal("category", cat),
          Query.orderDesc("publishedAt"),
          Query.limit(100),
        ]);

        allNews.push(...res.documents);
      }

      setNews(allNews);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch news");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, news, refetch: generalnews, selectedNews };
}
export default useNews;
