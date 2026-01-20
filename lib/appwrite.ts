import { Account, Client, Databases, ID } from "react-native-appwrite";

const client = new Client();
client
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("696a5880001a7a452499");

export const account = new Account(client);
export const database = new Databases(client);
export { ID };
