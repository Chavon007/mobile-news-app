import { account, database } from "@/lib/appwrite";
import { useState } from "react";

function useCategories() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const saveCategories = async () => {
    try {
      const user = await account.get();
      const userId = user.$id;

     
      const res = await database.createDocument(
        "001",         
        "categories",   
        userId,         
        {
          userId,
          categories: selectedCategories,
        }
      );

      console.log("Categories saved:", res);
      return res;
    } catch (err: any) {
      // If document already exists → update instead
      if (err.code === 409) {
        const user = await account.get();

        return await database.updateDocument(
          "001",
          "categories",
          user.$id,
          {
            categories: selectedCategories,
          }
        );
      }

      console.error("Failed to save categories:", err);
      throw err;
    }
  };

  return {
    selectedCategories,
    setSelectedCategories,
    saveCategories,
  };
}

export default useCategories;
