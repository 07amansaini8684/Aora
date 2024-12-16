import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import icons from "../constants/icons";
import { useVideoPlayer, VideoView } from "expo-video";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    creator: { username, avatar },
  },
}) => {
  const [play, setPlay] = useState(false);
  const player = useVideoPlayer(video);

  useEffect(() => {
    if (play) {
      player.play();
    } else {
      player.pause();
    }

    return () => {
      player.pause();
    };
  }, [play, player]);

  return (
    <View className="flex-col items-center px-4 mb-10">
      {/* Header */}
      <View className="flex-row gap-3 items-center">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-md border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              onError={() => console.log("Avatar load error")}
              className="w-full h-full rounded-sm"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white text-2xl font-semibold" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-sm font-pregular text-gray-100" numberOfLines={1}>
              {username}
            </Text>
          </View>
        </View>
        <View>
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {/* Video Player */}
      {play ? (
        <VideoView
          player={player}
          className="w-full z-10 rounded-xl mt-3"
          style={{ aspectRatio: 16 / 9 }}
          onError={(error) => console.log("Video Error:", error)}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setPlay(true)}
          accessibilityLabel="Play video"
          className="w-full h-60 rounded-md justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            onError={() => console.log("Thumbnail load error")}
            className="w-full h-full rounded-lg mt-3"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-14 h-14 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
