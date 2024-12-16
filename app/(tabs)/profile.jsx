import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/Empty";
import { getUserPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useLocalSearchParams } from "expo-router";
import {useGlobalContext }from "../../context/GlobalProvider.js"
import icons from "../../constants/icons"
const Profile = () => {
  const {user, setUser, setIsLoggedIn} = useGlobalContext()
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  console.log(posts)

  const logout =()=>{

  }

  return (
    <SafeAreaView className="bg-primary h-full ">
      <FlatList
        // data={[]}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity className="w-full items-end mb-10" onPress={logout}>
              <Image sources={icons.logout} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-full justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos Found"
            subtitle="No videos found for this search"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
