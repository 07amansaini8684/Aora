import { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Image , Alert} from "react-native";
import icons from "../constants/icons";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const [showPassword, setShowPassword] = useState(false);
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
    <View className="w-full h-20 px-4 bg-black-100 rounded-md flex-row items-center border focus:border-secondary space-x-4">
      <TextInput
        placeholder="Search for a video topic"
        placeholderTextColor={"#CDCDE0"}
        value={query}
        onChangeText={(e) => setQuery(e)}
        className="text-base text-white flex-1 font-pregular"
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Error",
              "Please enter a something to search result "
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMethod="containe"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
