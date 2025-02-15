import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import FormField from "@/components/Input";
import CustomButton from "@/components/Button";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
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

  //   const validatePassword = (password: string) => {
  //     const minLength = /.{8,}/;
  //     const hasLowercase = /[a-z]/;
  //     const hasUppercase = /[A-Z]/;
  //     const hasNumber = /[0-9]/;

  //     if (!minLength.test(password)) {
  //       return "Password must be at least 8 characters long.";
  //     }
  //     if (!hasLowercase.test(password)) {
  //       return "Password must include at least one lowercase letter.";
  //     }
  //     if (!hasUppercase.test(password)) {
  //       return "Password must include at least one uppercase letter.";
  //     }
  //     if (!hasNumber.test(password)) {
  //       return "Password must include at least one number.";
  //     }
  //     return "";
  //   };

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
    setuserData((prev) => ({ ...prev, password: value }));
    validatePassword(value);
  };

  const isFormValid = () => {
    return Object.values(passwordConditions).every(Boolean);
  };

  const PasswordConditions = ({ conditions: any }) => (
    <ul>
      <li>
        {passwordConditions.minLength ? (
          <FontAwesome5 name="check" size={24} color="black" />
        ) : (
          <Feather name="x-circle" size={24} color="black" />
        )}
        Password must be at least 8 characters long.
      </li>
      <li>
        {passwordConditions.hasLowercase ? (
          <FontAwesome5 name="check" size={24} color="black" />
        ) : (
          <Feather name="x-circle" size={24} color="black" />
        )}{" "}
        Password must include at least one lowercase letter.
      </li>
      <li>
        {passwordConditions.hasUppercase ? (
          <FontAwesome5 name="check" size={24} color="black" />
        ) : (
          <Feather name="x-circle" size={24} color="black" />
        )}{" "}
        Password must include at least one uppercase letter.
      </li>
      <li>
        {passwordConditions.hasNumber ? (
          <FontAwesome5 name="check" size={24} color="black" />
        ) : (
          <Feather name="x-circle" size={24} color="black" />
        )}{" "}
        Password must include at least one number.
      </li>
    </ul>
  );

  // In your component render method
  <PasswordConditions conditions={passwordConditions} />;

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
            title="Password"
            value={userData.password}
            placeholder="Enter Full Name"
            handleChangeText={handlePasswordChange}
            otherStyles="mt-5 mb-2"
            keyboardType="default"
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

export default Password;
