import { database } from "@/lib/appwrite";
import { useEffect, useState } from "react";
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
}

function FetchNews() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [news, setNews] = useState<fetchNews[]>([]);

  const generalnews = async () => {
    setLoading(true);
    setError("");
    try {
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
  useEffect(() => {
    generalnews();
  }, []);
  return { loading, error, news, refetch: generalnews };
}
export default FetchNews;
