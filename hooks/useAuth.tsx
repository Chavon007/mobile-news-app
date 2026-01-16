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

  const storeToken = async (token: string) => {
    try {
      await AsyncStorage.setItem("token", token);
    } catch (err) {
      console.error("Failed to store token", err);
    }
  };

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
      const res = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Can't sign up now!");

      if (data.token) {
        await storeToken(data.token);
      }
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
      const res = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Can't login now");
      if (data.token) {
        await storeToken(data.token);
      }
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
