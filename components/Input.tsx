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
  error,
  editable = true,
  ...props
}: {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles?: string;
  keyboardType?: KeyboardType;
  error?: string | React.ReactElement;
  editable?: boolean;
}) => {
  const [showPassword, setshowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base 12 text-black font-pregular mb-3">
        {title}
      </Text>
      <View
        className={`border-2
          ${
            error
              ? "border-red-500"
              : isFocused
              ? "border-green-500"
              : "border-zinc-400"
          }
          flex-row w-full h-16 px-4
          ${editable ? "bg-black-100" : "bg-gray-100"}
          rounded-2xl items-center`}
      >
        <TextInput
          className={`flex-1 text-black font-pmedium text-base ${
            !editable && "opacity-70"
          }`}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="gray"
          placeholderClassName="text-red"
          onChangeText={handleChangeText}
          selectionColor="gray"
          keyboardType={keyboardType}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={editable}
          {...props}
        />
        {title === "Password" && editable && (
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
      {error && (
        <Text className="text-red-500 text-sm font-pregular mt-1">{error}</Text>
      )}
    </View>
  );
};

export default FormField;
