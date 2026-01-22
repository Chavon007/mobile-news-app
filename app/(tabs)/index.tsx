import RenderNews from "@/components/newscard";
import useNews from "@/hooks/useNews";
import { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";
export default function Index() {
  const { loading, error, news, selectedNews } = useNews();

  useEffect(() => {
    selectedNews();
  }, []);

  if (loading && news.length === 0) {
    return (
      <View className="flex-1 justify-center items-center  bg-[#aaafb8]">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-600">Loading news....</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex justify-center items-center h-[100vh] bg-[#aaafb8]">
        <Text className=" max-w-[300px] text-base font-serif italic  text-blue-900 text-center mx-auto">{error}</Text>
      </View>
    );
  }
  return (
    <View className="flex-1  bg-[#aaafb8]">
      <FlatList
        data={news}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <RenderNews
            sourceName={item.sourceName}
            author={item.author}
            title={item.title}
            description={item.description}
            url={item.url}
            urlToImage={item.urlToImage}
            publishedAt={item.publishedAt}
            content={item.content}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={selectedNews} />
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center p-8">
            <Text className="text-gray-500 text-lg">No news available</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
