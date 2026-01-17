import useAuthentication from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => {
  const router = useRouter();
  const { loading, success, error, formData, setFormData, login } =
    useAuthentication(router.push);

  return (
    <View className="bg-[#aaafb8] min-w-full h-[109vh]">
      <View className="w-[95%] mx-auto flex-1 justify-center my-[70px]">
        <Image
          className="mx-auto"
          source={require("../assets/images/logo.png")}
          style={{ width: 300, height: 120 }}
        />

        <View className="flex-1 gap-4 mt-2  p-2">
          <Text className="text-2xl font-bold text-blue-900 font-mono italic">
            Login to Your Account
          </Text>

          <View className="gap-3">
            <Text className="text-blue-800 text-1xl font-bold font-sans">
              Email
            </Text>
            <TextInput
              className="bg-gray-400 placeholder:p-3 italic text-xs rounded-xl text-blue-300 font-bold"
              value={formData.email}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Email"
            />
          </View>

          <View className="gap-3">
            <Text className="text-blue-800 text-1xl font-bold font-sans">
              Password
            </Text>
            <TextInput
              className="bg-gray-400  placeholder:p-3 italic text-xs rounded-xl text-blue-300 font-bold"
              value={formData.password}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
              placeholder="Password"
            />
          </View>

          <TouchableOpacity
            className="bg-blue-800 rounded-xl mx-auto w-[100px] p-2"
            onPress={login}
            disabled={loading}
          >
            <Text className="text-center text-base text-serif text-blue-100 font-bold">
              {loading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          {error && <Text className="text-red-500 text-sm">{error}</Text>}
          {success && <Text className="text-green-500 text-sm">{success}</Text>}

          <Text className="text-center  p-3 flex items-center">
            <Text className="text-1xl font-sans text-blue-800">
              You do not have an account?{" "}
            </Text>
            <Text
              className="text-1xl font-sans underline italic text-blue-900"
              onPress={() => router.push("/signup")}
            >
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
