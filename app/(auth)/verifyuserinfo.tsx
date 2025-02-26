import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import CustomButton from "@/components/Button";
import FormField from "@/components/Input";
import { router } from "expo-router";

const VerifyUserInfo = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with actual data from API/props
  const userInfo = {
    firstName: "John",
    middleName: "Doe",
    dateOfBirth: "01/01/1990",
    bvn: "12345678901",
  };

  const handleVerification = async () => {
    try {
      setIsLoading(true);
      // Add verification logic here
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      router.push("/(tabs)");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="mt-[50px]" />
        <View className="px-6 mt-16">
          <Text className="text-3xl font-pbold mb-2 text-gray-900">
            Confirm Your personal info
          </Text>
          <Text className="text-base font-psemibold text-gray-600 mt-2 mb-6">
            Ensure that all the details belong to you and is correct
          </Text>

          <FormField
            title="First and middle Name"
            value={userInfo.firstName.toUpperCase()}
            placeholder=""
            handleChangeText={() => {}}
            otherStyles="mb-4"
            editable={false}
          />

          <FormField
            title="Last Name"
            value={userInfo.middleName.toUpperCase()}
            placeholder=""
            handleChangeText={() => {}}
            otherStyles="mb-4"
            editable={false}
          />

          <FormField
            title="Date of Birth"
            value={userInfo.dateOfBirth}
            placeholder=""
            handleChangeText={() => {}}
            otherStyles="mb-4"
            editable={false}
          />

          <FormField
            title="BVN"
            value={userInfo.bvn}
            placeholder=""
            handleChangeText={() => {}}
            otherStyles="mb-6"
            editable={false}
          />    
        </View>

        <View className="mt-auto px-6 py-4">
          <CustomButton
            text="This is Me!"
            handlePress={handleVerification}
            isLoading={isLoading}
            textStyles="font-pmedium text-white"
            containerStyles="w-full bg-primary-600"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default VerifyUserInfo;
