import { useState } from "react";
import { Image, Linking, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
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

  return (
    <>
      <View>
        {urlToImage && <Image source={{ uri: urlToImage }} />}
        <View>
          <Text>{title}</Text>
          <Text>
            <Text>{author}</Text>
            <Text>{publishedAt}</Text>
          </Text>
          <Text>{description}</Text>
          <Text>
            <Text>{sourceName}</Text>
            <Text>
              <TouchableOpacity onPress={() => setmodalVisible(true)}>
                <Text>View News Details</Text>
              </TouchableOpacity>
            </Text>
          </Text>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        onRequestClose={() => setmodalVisible(false)}
      >
        <View>
            <ScrollView>
                <Text>{content}</Text>
                <Pressable onPress={() => Linking.openURL(url)}>
                    <Text> Read Full Article</Text>
                </Pressable>

                <TouchableOpacity onPress={() => setmodalVisible(false)}><Text>Close</Text></TouchableOpacity>
            </ScrollView>
        </View>
      </Modal>
    </>
  );
}
export default RenderNews;
