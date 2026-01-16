import useAuthentication from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Signup = () => {
  const router = useRouter();
  const { loading, success, error, formData, setFormData, signUp } =
    useAuthentication(router.push);

  return (
    <View className="bg-red-200">
      <Text>Create Your Account</Text>
      <View>
        <Text>Email</Text>
        <TextInput
          value={formData.email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="Email"
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          autoCapitalize="none"
          value={formData.password}
          secureTextEntry
          onChangeText={(text) => setFormData({ ...formData, password: text })}
        />
      </View>
      <View>
        <Text>Confirm Password</Text>
        <TextInput
          placeholder="Confirm password"
          autoCapitalize="none"
          value={formData.confirmPassword}
          onChangeText={(text) =>
            setFormData({ ...formData, confirmPassword: text })
          }
          secureTextEntry
        />
      </View>

      <TouchableOpacity onPress={signUp} disabled={loading}>
        <Text>{loading ? "Creating..." : "Create Account"}</Text>
      </TouchableOpacity>

      {error && <Text>{error}</Text>}
      {success && <Text>{success}</Text>}
      <Text>
        <Text>Already have an account? </Text>
        <Text onPress={() => router.push("/login")}>Login</Text>
      </Text>
    </View>
  );
};

export default Signup;