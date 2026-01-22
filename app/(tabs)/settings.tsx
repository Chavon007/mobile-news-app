import useCategories from "@/hooks/usePermission";
import React from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

const categories = [
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const Settings = () => {
  const {
    selectedCategories,
    setSelectedCategories,
    success,
    error,
    saveCategories,
  } = useCategories();

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };

  return (
    <View className="flex-1 gap-8 p-2 bg-[#aaafb8]">
      <View className="w-[98%] mx-auto px-2">
        <Text className="text-base font-bold text-blue-900 my-3">
          Select news categories to display on your newsfeed
        </Text>

        {categories.map((category) => (
          <View
            key={category}
            className="flex-row items-center justify-between p-1"
          >
            <Text className="p-2 text-gray-600 font-bold text-2xl capitalize">
              {category}
            </Text>

            <Switch
              value={selectedCategories.includes(category)}
              onValueChange={() => toggleCategory(category)}
            />
          </View>
        ))}
      </View>

      <TouchableOpacity
        onPress={saveCategories}
        className="mt-8 self-center bg-blue-800 w-[140px] rounded-xl p-3"
      >
        <Text className="text-center text-blue-100 font-bold">
          Save Settings
        </Text>
      </TouchableOpacity>
      <View>
        {success && (
          <Text className="text-green-500 text-sm font-mono">{success}</Text>
        )}
        {error && (
          <Text className="text-red-500 text-sm font-mono">{error}</Text>
        )}
      </View>
    </View>
  );
};

export default Settings;
