import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const Signup = () => {
  return (
    <View>
      <Text>Create Your Account</Text>
      <View>
        <Text>Email</Text>
        <TextInput keyboardType="email-address" placeholder="Email" />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput placeholder="Password" secureTextEntry />
      </View>
      <View>
        <Text>Confirm Password</Text>
        <TextInput placeholder="Confirm password" secureTextEntry />
      </View>

      <TouchableOpacity>
        <Text>Create</Text>
      </TouchableOpacity>

      <Text>
        <Text>Already have an account ?</Text> <Text>Login</Text>
      </Text>
    </View>
  );
};

export default Signup;
