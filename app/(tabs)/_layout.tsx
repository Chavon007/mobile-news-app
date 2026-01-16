import { Tabs } from "expo-router";

function _layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Newsfeed" }} />
      <Tabs.Screen name="generalnews" options={{ title: "General news" }} />
      <Tabs.Screen name="settings" options={{ title: "settings" }} />
    </Tabs>
  );
}
export default _layout;
