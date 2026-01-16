import { account } from "@/lib/appwrite";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await account.get();
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };
  if (isAuthenticated === null) {
    return null;
  }
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }
  return <Redirect href="/signup" />;
};

export default Index;
