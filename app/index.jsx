import { Text, View, ScrollView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router, Redirect  } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import images from "../constants/images";
import CustomButton from "../components/buttonCompo";
import { useGlobalContext } from "../context/GlobalProvider";
const _layout = () => {
  const {loading, isLoggedIn} = useGlobalContext();
  if(!loading && isLoggedIn) return <Redirect href="/home" />
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full min-h-[80vh]  justify-start items-center px-4">
          <Image
            source={images.logo}
            className="w-[184px] h-[184px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full  h-[300px]"
            resizeMode="contain"
            resizeModeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-white text-3xl font-bold text-center">Discover Endless Possibilities with {""}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image source={images.path} className="w-[70px] h-15 absolute -bottom-[18px] right-[110px]" resizeMode="contain"/>
          </View>
          <Text className="text-xs font-pregular text-white text-center mt-7 ">Where creativity meets innovation: embark on a journey of of limitless exploration with Aora. </Text>
          <CustomButton title="Continue With Email" handlePress={() => router.push("/sign-in")} containerStyles="w-full mt-7 " />
        </View>
      </ScrollView>
      <StatusBar barStyle="light-content" hidden={true} className="#161622" style="light"/>
    </SafeAreaView>
  );
};

export default _layout;
