import CustomButton from "@/components/Button";
import FormField from "@/components/Input";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StatusBar, SafeAreaView } from "react-native";
import { View, Text } from "react-native";

interface SignUpState {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const Signup = () => {
  const [userData, setuserData] = useState<SignUpState>({
    fullName: "",
    phoneNumber: "",
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

  const isValidPhoneNumber = (phone: string) => {
    return phone.length >= 10;
  };

  const validateField = (field: keyof SignUpState, value: string) => {
    let error = "";
    switch (field) {
      case "fullName":
        if (value.length > 0 && value.length < 3) {
          error = "Full name must be at least 3 characters";
        }
        break;
      case "email":
        if (value.length > 0 && !isValidEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "phoneNumber":
        if (value.length > 0 && !isValidPhoneNumber(value)) {
          error = "Phone number must be at least 10 digits";
        }
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChangeText = (field: keyof SignUpState, value: string) => {
    setuserData((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const isFormValid = () => {
    return (
      userData.fullName.length > 2 &&
      isValidEmail(userData.email) &&
      isValidPhoneNumber(userData.phoneNumber) &&
      !errors.fullName &&
      !errors.email &&
      !errors.phoneNumber
    );
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="h-full flex-col">
        <StatusBar barStyle="dark-content" />

        <View className="flex-col justify-center px-6 mt-16">
          <View className="mt-[50px]" />
          <Text className="text-3xl font-pbold mb-2">Create Account</Text>
          <Text className="text-base font-pmedium mt-2 mb-2">
            Join the 13% of the population who wants to see how their money is
            doing.
          </Text>
          <FormField
            title="Full Name"
            value={userData.fullName}
            placeholder="Enter Full Name"
            handleChangeText={(value) => handleChangeText("fullName", value)}
            otherStyles="mt-5 mb-2"
            keyboardType="default"
            error={errors.fullName}
          />
          <FormField
            title="Email Address"
            value={userData.email}
            placeholder="Enter email address"
            handleChangeText={(value) => handleChangeText("email", value)}
            otherStyles="mt-5"
            keyboardType="email-address"
            error={errors.email}
          />
          <FormField
            title="Phone Number"
            value={userData.phoneNumber}
            placeholder="Enter Phone Number"
            handleChangeText={(value) => handleChangeText("phoneNumber", value)}
            otherStyles="mt-5"
            keyboardType="phone-pad"
            error={errors.phoneNumber}
          />

          <View className="mt-8 flex items-center justify-center">
            <CustomButton
              text="Sign Up"
              handlePress={() => {
                if (isFormValid()) {
                  console.log("loginData", userData);
                  router.push("/(auth)/password");
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
