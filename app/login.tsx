import useAuthentication from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => {
  const router = useRouter();
  const { loading, success, error, formData, setFormData, login } =
    useAuthentication(router.push);

  return (
    <View>
      <Text>Login</Text>

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
          value={formData.password}
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          placeholder="Password"
        />
      </View>

      <TouchableOpacity onPress={login} disabled={loading}>
        <Text>{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>

      {error && <Text>{error}</Text>}
      {success && <Text>{success}</Text>}

      <Text>
        <Text>You do not have an account? </Text>
        <Text onPress={() => router.push("/signup")}>Sign up</Text>
      </Text>
    </View>
  );
};

export default Login;