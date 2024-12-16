import { useState } from "react";
import { Text, TextInput, View, TouchableOpacity, Image } from "react-native";
import icons from "../constants/icons";

const FormField = ({
  title,
  value,
  handleChange,
  placeholder,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {/* Title */}
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>

      {/* Input Field */}
      <View className="w-full h-16 px-4 bg-black-100 rounded-md flex-row items-center border focus:border-secondary">
        <TextInput
          secureTextEntry={title === "Password" && !showPassword}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          value={value}
          onChangeText={handleChange}
          className="flex-1 text-white font-psemibold text-base"
          {...props}
        />

        {/* Password Visibility Toggle */}
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            className="ml-2 flex items-center justify-center"
          >
            <Image source={showPassword ? icons.eyeHide : icons.eye} className="w-5 h-5" />
            <Text className="text-gray-400 text-xs">
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
