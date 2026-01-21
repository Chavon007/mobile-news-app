import React, { useState } from "react";
import { Switch, Text, View } from "react-native";

const Settings = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previous) => !previous);
  return (
    <View className="flex-1 justify-center items-center">
      <View>
        <Text>Select news categories to Display on your newsfeed</Text>
        <Text>
          <Text>Business</Text>

          <Text><Switch value={isEnabled} /></Text>
        </Text>
      </View>
    </View>
  );
};

export default Settings;
