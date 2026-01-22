import React, { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

const Settings = () => {
  const [businessEnabled, setBusinessEnabled] = useState(false);
  const [entertanmentEnabled, setEntertanmentEnabled] = useState(false);
  const [healthEnabled, setHealthEnabled] = useState(false);
  const [scienceEnabled, setscienceEnabled] = useState(false);
  const [sportEnabled, setSportEnabled] = useState(false);
  const [technologyEnabled, setTechnologyEnabled] = useState(false);
  return (
    <View className=" bg-[[#aaafb8]] flex-1 gap-8 p-2">
      <View className="w-[98%] mx-auto px-2">
        <Text className="text-base font-sans font-bold text-blue-900 my-3">
          Select news categories to Display on your newsfeed
        </Text>
        <View className="flex-row items-center  justify-between p-1">
          <Text className="p-2 text-gray-500 font-serif  font-bold text-2xl">
            Business
          </Text>

          <Switch
            className=""
            value={businessEnabled}
            onChange={() => setBusinessEnabled(!businessEnabled)}
          />
        </View>

        <View className="flex-row items-center  justify-between p-1">
          <Text className="p-2 text-gray-500 font-serif  font-bold text-2xl">
            Entertainment
          </Text>
          <Text>
            <Switch
              value={entertanmentEnabled}
              onChange={() => setEntertanmentEnabled(!entertanmentEnabled)}
            />
          </Text>
        </View>

        <View className="flex-row items-center  justify-between p-1">
          <Text className="p-2 text-gray-500 font-serif  font-bold text-2xl">
            Health
          </Text>

          <Text>
            <Switch
              value={healthEnabled}
              onChange={() => setHealthEnabled(!healthEnabled)}
            />
          </Text>
        </View>

        <View className="flex-row items-center  justify-between p-1">
          <Text className="p-2 text-gray-500 font-serif  font-bold text-2xl">
            Science
          </Text>

          <Text>
            <Switch
              value={scienceEnabled}
              onChange={() => setscienceEnabled(!scienceEnabled)}
            />
          </Text>
        </View>

        <View className="flex-row items-center  justify-between p-1">
          <Text className="p-2 text-gray-500 font-serif  font-bold text-2xl">
            Sports
          </Text>

          <Text>
            <Switch
              value={sportEnabled}
              onChange={() => setSportEnabled(!sportEnabled)}
            />
          </Text>
        </View>

        <View className="flex-row items-center  justify-between p-1">
          <Text className="p-2 text-gray-500 font-serif  font-bold text-2xl">
            Technology
          </Text>
          <Text>
            <Switch
              value={technologyEnabled}
              onChange={() => setTechnologyEnabled(!technologyEnabled)}
            />
          </Text>
        </View>
      </View>

      <View>
        <TouchableOpacity className="mt-8 flex justify-center items-center bg-blue-800 w-[100px] rounded-xl p-2 mx-auto">
          <Text className="text-center text-base text-serif text-blue-100 font-bold">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;
