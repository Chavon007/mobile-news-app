import { account, database } from "@/lib/appwrite";
import { useState } from "react";

function useCategories() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const saveCategories = async () => {
    setError("");
    setSuccess("");
    try {
      const user = await account.get();
      const userId = user.$id;

      const res = await database.createDocument("001", "categories", userId, {
        userId,
        newsCategories: selectedCategories,
      });
      setSuccess("Categories saved succesfully");
      console.log("Categories saved:", res);
      return res;
    } catch (err: any) {
      // If document already exists → update instead
      if (err.code === 409) {
        const user = await account.get();

        const res = await database.updateDocument(
          "001",
          "categories",
          user.$id,
          {
            newsCategories: selectedCategories,
          },
        );
        setSuccess("Categories updated successfully");
        return res;
      }
      setError("Can't save categories now");
      console.error("Failed to save categories:", err);
      throw err;
    }
  };

  return {
    selectedCategories,
    setSelectedCategories,
    saveCategories,
    success,
    error,
  };
}

export default useCategories;
