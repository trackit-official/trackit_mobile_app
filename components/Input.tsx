import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardType,
} from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
  ...props
}: {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: KeyboardType;
}) => {
  const [showPassword, setshowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base 12 text-black font-pregular mb-2">
        {title}
      </Text>
      <View className="border-2 border-zinc-400 flex-row w-full h-16 px-4  bg-black-100 rounded-2xl focus:border-zinc-600 items-center">
        <TextInput
          className="flex-1 text-black font-pmedium text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="gray"
          placeholderClassName="text-red"
          onChangeText={handleChangeText}
          selectionColor="gray"
          keyboardType={keyboardType}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => {
              setshowPassword(!showPassword);
            }}
          >
            <MaterialCommunityIcons
              name={!showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
