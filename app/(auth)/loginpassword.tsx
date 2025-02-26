import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FormField from "@/components/Input";
import CustomButton from "@/components/Button";
import { router } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface LoginPasswordData {
  password: string;
}

const LoginPassword = () => {
  const [userData, setUserData] = useState<LoginPasswordData>({
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (value: string) => {
    setIsError(false);
    setUserData((prev) => ({ ...prev, password: value }));
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      // For demo purposes, checking hardcoded password
      if (userData.password === "Password123") {
        router.push("/(tabs)");
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="px-6 mt-16">
          <View className="mt-[50px]" />
          <Text className="text-3xl font-pbold mb-2 text-gray-900">
            Enter password
          </Text>
          <Text className="text-base font-pmedium text-gray-600 mt-2 mb-6">
            Make sure no one is watching you. Even our eyes are closed. 🙈
          </Text>

          <FormField
            title="Password"
            value={userData.password}
            placeholder="Enter your password"
            handleChangeText={handlePasswordChange}
            otherStyles="mb-6"
            keyboardType="default"
            error={isError ? "Incorrect password" : ""}
          />

          {isError && (
            <View className="flex-row items-center space-x-2 mb-4">
              <MaterialCommunityIcons
                name="alert-circle"
                size={20}
                color="#EF4444"
              />
              <Text className="text-red-500 text-sm font-pmedium">
                Incorrect password. Please try again
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={() => router.push("/(auth)/resetpassword")}
            className="mb-8"
          >
            <Text className="text-primary-600 font-pmedium text-base">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-auto px-6 py-4">
          <CustomButton
            text="Continue"
            handlePress={handleLogin}
            isLoading={isLoading}
            textStyles="font-pmedium text-white"
            containerStyles="w-full bg-primary-600"
            disabled={!userData.password}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPassword;
