import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  KeyboardType,
} from "react-native";
import React from "react";

const CustomButton = ({
  text,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
  icon,
  iconStyles,
  disabled,
}: {
  text: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading: boolean;
  icon?: ImageSourcePropType;
  iconStyles?: string;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={`rounded-lg min-h-[50px] justify-center items-center ${containerStyles} ${
        isLoading || disabled ? "opacity-50" : ""
      }`}
      disabled={isLoading || disabled}
    >
      <View className="flex-row justify-center items-center">
        {icon && (
          <Image
            source={icon}
            className={`w-6 h-6 mr-9 ${iconStyles}`}
            resizeMode="contain"
          />
        )}
        <Text
          className={`font-psemibold text-[14.5px] text-center ${textStyles}`}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;
