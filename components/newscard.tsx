import { useState } from "react";
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface newsCard {
  sourceName: string;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const FALLBACK_IMAGE = "https://plus.unsplash.com/premium_vector-1721762658788-8af51eb930a1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0";

function RenderNews({
  sourceName,
  author,
  title,
  description,
  url,
  urlToImage,
  content,
  publishedAt,
}: newsCard) {
  const [modalVisible, setmodalVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Parse sourceName if it's a JSON string
  const getSourceName = () => {
    try {
      const parsed = JSON.parse(sourceName);
      return parsed.name || sourceName;
    } catch {
      return sourceName;
    }
  };

  const displaySourceName = getSourceName();
  
  // Use fallback if no image or if image fails to load
  const imageUrl = (!urlToImage || imageError) ? FALLBACK_IMAGE : urlToImage;

  return (
    <>
      <View className="bg-white m-3 rounded-lg shadow-md overflow-hidden">
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: "100%",
            height: 192,
          }}
          resizeMode="cover"
          onError={() => {
            if (!imageError) {
              console.log("Image failed, using fallback");
              setImageError(true);
            }
          }}
        />

        <View className="p-4 ">
          <Text
            className="text-xl font-bold text-blue-900 mb-2"
            numberOfLines={4}
          >
            {title}
          </Text>

          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-gray-600">{author || "Unknown"}</Text>
            <Text className="text-sm text-gray-500">
              {new Date(publishedAt).toLocaleDateString()}
            </Text>
          </View>

          <Text className="text-gray-700 mb-3" numberOfLines={3}>
           {description}
          </Text>

          <View className="flex-row justify-between items-center">
            <Text className="text-xs text-gray-500 italic font-mono font-bold">
                Source: {displaySourceName}
            </Text>
            <TouchableOpacity
              onPress={() => setmodalVisible(true)}
              className="bg-blue-800 px-4 py-2 rounded-lg"
            >
              <Text className="text-white font-semibold">Read More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        onRequestClose={() => setmodalVisible(false)}
        animationType="slide"
      >
        <View className="flex-1 bg-white">
          <View className="bg-blue-800 p-4 pt-12">
            <Text className="text-white text-xl font-bold" numberOfLines={4}>
              {title}
            </Text>
          </View>

          <ScrollView className="flex-1 p-4">
            <Image
              source={{ uri: imageUrl }}
              style={{
                width: "100%",
                height: 256,
                borderRadius: 8,
                marginBottom: 16,
              }}
              resizeMode="cover"
              onError={() => {
                if (!imageError) {
                  setImageError(true);
                }
              }}
            />

            <Text className="text-gray-500 text-sm mb-2">
              Source: {displaySourceName}
            </Text>

            <Text className="text-gray-800 text-base leading-6 mb-4">
              {content}
            </Text>

            <Pressable
              onPress={() => Linking.openURL(url)}
              className="bg-blue-900 p-4 rounded-lg mb-4"
            >
              <Text className="text-white text-center font-bold">
                Read Full Article
              </Text>
            </Pressable>

            <TouchableOpacity
              onPress={() => setmodalVisible(false)}
              className="bg-gray-200 p-4 rounded-lg mb-8"
            >
              <Text className="text-gray-800 text-center font-bold">Close</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

export default RenderNews;