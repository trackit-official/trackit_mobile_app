import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import FormField from "@/components/Input";
import CustomButton from "@/components/Button";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
interface PassWord {
  password: string;
}

const Password = () => {
  const [userData, setuserData] = useState<PassWord>({
    password: "",
  });

  const [passwordConditions, setPasswordConditions] = useState({
    minLength: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
  });

  const [isTyping, setIsTyping] = useState(false);

  const validatePassword = (password: string) => {
    const conditions = {
      minLength: password.length >= 8,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };
    setPasswordConditions(conditions);
    return Object.values(conditions).every(Boolean)
      ? ""
      : "Password does not meet all conditions.";
  };

  const handlePasswordChange = (value: string) => {
    setIsTyping(value.length > 0);
    setuserData((prev) => ({ ...prev, password: value }));
    validatePassword(value);
  };

  const isFormValid = () => {
    return Object.values(passwordConditions).every(Boolean);
  };

  const PasswordCondition = ({ met, text }: { met: boolean; text: string }) => (
    <View className="flex-row items-center space-x-2 mb-3">
      {isTyping ? (
        met ? (
          <FontAwesome5
            style={{}}
            name="check-circle"
            size={20}
            color="#22C55E"
          />
        ) : (
          <MaterialCommunityIcons
            name="information"
            size={20}
            color="#EF4444"
          />
        )
      ) : (
        <MaterialIcons name="check-circle" size={20} color="#94A3B8" />
      )}
      <Text
        className={`ml-1 font-pmedium ${
          !isTyping ? "text-gray-400" : met ? "text-gray-900" : "text-gray-900"
        }`}
      >
        {text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <ScrollView className="flex-1">
          <View className="flex-col justify-center px-6 mt-16">
            <View className="mt-[50px]" />
            <Text className="text-3xl font-pbold mb-2 text-gray-900">
              Create a password
            </Text>
            <Text className="text-base font-pmedium text-gray-600 mt-2 mb-6">
              Help us to secure your account by creating a strong password.
            </Text>

            <FormField
              title="Password"
              value={userData.password}
              placeholder="Enter your password"
              handleChangeText={handlePasswordChange}
              otherStyles="mb-6"
              keyboardType="default"
            />

            <View className="mb-8">
              <PasswordCondition
                met={passwordConditions.minLength}
                text="At least 8 characters long"
              />
              <PasswordCondition
                met={passwordConditions.hasLowercase}
                text="One lowercase letter"
              />
              <PasswordCondition
                met={passwordConditions.hasUppercase}
                text="One uppercase letter"
              />
              <PasswordCondition
                met={passwordConditions.hasNumber}
                text="One number"
              />
            </View>
          </View>
        </ScrollView>

        <View className="px-6 py-4  border-gray-200">
          <CustomButton
            text="Continue"
            handlePress={() => {
              if (isFormValid()) {
                router.push("/(auth)/verifymail");
              }
            }}
            isLoading={false}
            textStyles={`font-pmedium ${
              isFormValid() ? "text-white" : "text-gray-500"
            }`}
            containerStyles={`w-full ${
              isFormValid() ? "bg-primary-600" : "bg-primary-100"
            }`}
            disabled={!isFormValid()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Password;
