import { View, Text, TouchableOpacity } from "react-native";
import React from "react";


const CustomButton = ({ title, containerStyles, handlePress, textSyles, isLoading }) => {
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}  className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading && 'opacity-50'}`} disabled={isLoading}>
      <Text className={`text-primary font-psemibold text-lg ${textSyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;


