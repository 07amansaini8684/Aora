import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";


import {
  APPWRITE_ENDPOINT,
  APPWRITE_PLATFORM,
  APPWRITE_PROJECT_ID,
  APPWRITE_DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID,
  APPWRITE_VIDEOS_COLLECTION_ID,
  APPWRITE_STORAGE_ID,
} from "@env";

export const appwriteConfig = {
  endpoint: APPWRITE_ENDPOINT,
  platform: APPWRITE_PLATFORM,
  projectId: APPWRITE_PROJECT_ID,
  databaseId: APPWRITE_DATABASE_ID,
  userCollectionID: APPWRITE_USER_COLLECTION_ID,
  videosCollectionID: APPWRITE_VIDEOS_COLLECTION_ID,
  storageId: APPWRITE_STORAGE_ID,
};

const {
  endpoint,
  platfrom,
  project,
  databaseId,
  userCollectionID,
  videosCollectionID,
  storageId,
} = appwriteConfig;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    // Input Validation
    if (!email || !password || !username) {
      throw new Error("All fields (email, password, username) are required.");
    }

    // Register User
    const createdAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    console.log("User created: ", createdAccount);

    if (!createdAccount) {
      throw new Error("User not created.");
    }

    // Generate Avatar URL
    const avatarUrl = avatars.getInitials(username);

    // Sign in the user
    await signIn(email, password);

    // Store User Details in Database
    const createdUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionID,
      ID.unique(),
      {
        email,
        username,
        avatar: avatarUrl,
        accountId: createdAccount.$id,
      }
    );

    // console.log("User details stored in database:", createdUser);

    return createdUser;
  } catch (error) {
    console.error("Error while creating user:", error);
    throw error; // Re-throw the error for caller to handle
  }
};

export const signIn = async (email, password) => {
  try {
    // Check if a session is already active
    const currentUser = await account.get();
    console.log("User already signed in:", currentUser);
    return currentUser; // Return the active session details
  } catch (error) {
    // If no active session, proceed to create one
    if (error.code === 401) {
      // 401 means no active session
      const session = await account.createEmailPasswordSession(email, password);
      console.log("User signed in:", session);
      return session;
    }
    console.error("Error while checking or creating session:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const currentUser = await account.get(); // Fetch current logged-in user
    if (!currentUser) throw new Error("User not found");

    // Query the database to find the user's document
    const queryResult = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionID,
      [Query.equal("accountId", currentUser.$id)] // Use listDocuments for queries
    );

    // Check if the document exists
    if (!queryResult.documents || queryResult.documents.length === 0) {
      throw new Error("User document not found in the database");
    }

    // Return the first matching document
    return queryResult.documents[0];
  } catch (error) {
    console.error("Error while checking or creating session:", error);
    throw error;
  }
};

// creating video function..

export const getAllPosts = async () => {
  try {
    const post = await databases.listDocuments(
      databaseId,
      videosCollectionID
    );
    // console.log("posts",post)
    return post.documents
  } catch (error) {
    console.log("Error while getting posts:", error);
    throw new Error(error)
  }
};

export const getLatestPosts = async () => {
  try {
    const post = await databases.listDocuments(
      databaseId,
      videosCollectionID,
      [Query.orderDesc(`$createdAt`, Query.limit(7))]
    );
    // console.log("posts",post)
    return post.documents
  } catch (error) {
    console.log("Error while getting posts:", error);
    throw new Error(error)
  }
};

export const searchPosts = async (query) => {
  try {
    const post = await databases.listDocuments(
      databaseId,
      videosCollectionID,
      [Query.search(`title`, query)]
    );
    // console.log("posts",post)
    return post.documents
  } catch (error) {
    console.log("Error while getting posts:", error);
    throw new Error(error)
  }
};


