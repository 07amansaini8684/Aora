import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import * as Animatable from "react-native-animatable";
import icons from "../constants/icons";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.05,
  },
};
const zoomOut = {
  0: {
    scale: 1.05,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ item, activeItem }) => {
  const [play, setPlay] = useState(false);
  const videoSource = `${item.video}`;

  // Initialize the video player
  const player = useVideoPlayer(videoSource);
  // Play the video when 'play' state is true, pause when false
  useEffect(() => {
    if (play) {
      player.play();
    } else {
      player.pause();
    }
    
  }, [play, player]);
  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <VideoView
          player={player}
          className="w-52 h-72 z-10 rounded-[33px] mt-3 bg-white/10"
        />
      ) : (
        <TouchableOpacity
          className="relative flex justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)} // Set play to true when clicked
        >
          <ImageBackground
            source={{
              uri: item.thumbnail,
            }}
            className="w-52 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};
export default Trending;
