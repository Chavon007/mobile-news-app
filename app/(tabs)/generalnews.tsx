import RenderNews from "@/components/newscard";
import useNews from "@/hooks/useNews";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

const Generalnews = () => {
  const { loading, error, news, refetch } = useNews();

  useEffect(() => {
    refetch();
  }, []);

  if (loading && news.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-600">Loading news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4">
        <Text className="text-red-500 text-center">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
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
          <RefreshControl refreshing={loading} onRefresh={refetch} />
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
};

export default Generalnews;
