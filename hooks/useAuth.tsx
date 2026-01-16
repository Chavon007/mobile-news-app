import { account, ID } from "@/lib/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
interface authenticationType {
  email: string;
  password: string;
  confirmPassword?: string;
}

function useAuthentication(navigate: (path: any) => void) {
  const [formData, setFormData] = useState<authenticationType>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const storeSession = async (userId: string) => {
    try {
      await AsyncStorage.setItem("userId", userId);
    } catch (err) {
      console.error("failed to store session", err);
    }
  };
  //   const storeToken = async (token: string) => {
  //     try {
  //       await AsyncStorage.setItem("token", token);
  //     } catch (err) {
  //       console.error("Failed to store token", err);
  //     }
  //   };

  const signUp = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Use a valid email addresss");
      setLoading(false);
      return;
    } else if (formData.password !== formData.confirmPassword) {
      setError("Password and confirm password does not match");
      setLoading(false);
      return;
    }
    try {
      const res = await account.create(
        ID.unique(),
        formData.email,
        formData.password,
        formData.email.split("@")[0]
      );

      await account.createEmailPasswordSession(
        formData.email,
        formData.password
      );

      await storeSession(res.$id);
      setSuccess("Sign up success");
      setTimeout(() => {
        navigate("/(tabs)" as any);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }
    try {
      const session = await account.createEmailPasswordSession(
        formData.email,
        formData.password
      );
      await storeSession(session.userId);
      setSuccess("Login successful");
      setTimeout(() => {
        navigate("/(tabs)" as any);
      }, 1000);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, error, formData, setFormData, signUp, login };
}

export default useAuthentication;
