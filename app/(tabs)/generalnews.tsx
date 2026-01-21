import RenderNews from "@/component/newscard";
import useNews from "@/hooks/useNews";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

const Generalnews = () => {
  const { loading, error, news, refetch } = useNews();

  if (loading && news.length) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
      data={news} keyExtractor={(item) => item.$id}
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
          <View>
            <Text>No news available</Text>
          </View>
        }
      />
    </View>
  );
};

export default Generalnews;
