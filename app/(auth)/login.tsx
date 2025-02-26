import CustomButton from "@/components/Button";
import FormField from "@/components/Input";
import { router } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, ScrollView, StatusBar, View, Text } from "react-native";

interface SignInState {
  email: string;
  password: string;
}

const Login = () => {
  const [userData, setuserData] = useState<SignInState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = () => {
    return isValidEmail(userData.email) && !errors.email && !errors.phoneNumber;
  };

  const handleChangeText = (key: keyof SignInState, value: string) => {
    setuserData({ ...userData, [key]: value });
    setErrors({ ...errors, [key]: "" });
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="h-full flex-col">
        <StatusBar barStyle="dark-content" />

        <View className="flex-col justify-center px-6 mt-16">
          <View className="mt-[50px]" />
          <Text className="text-3xl font-pbold mb-2">Welcome back</Text>
          <Text className="text-base font-pmedium mt-2 mb-2">
            Lets pick up where we stopped. ❤️
          </Text>
          <FormField
            title="Email address"
            value={userData.email}
            placeholder="Enter Full Name"
            handleChangeText={(value) => handleChangeText("email", value)}
            otherStyles="mt-5 mb-2"
            keyboardType="email-address"
            error={errors.fullName}
          />{" "}
        </View>
      </ScrollView>

      <View className="px-6 py-4 border-gray-200">
        <CustomButton
          text="Next"
          handlePress={() => {
            if (isFormValid()) {
              console.log("loginData", userData);
              router.push("/(auth)/loginpassword");
            }
          }}
          isLoading={false}
          textStyles={`font-pmedium ${
            isFormValid() ? "text-white" : "font-gray-lightgray"
          }`}
          containerStyles={`w-full mt-3 mb-3 ${
            isFormValid() ? "bg-primary-600" : "bg-primary-200"
          }`}
          disabled={!isFormValid()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
