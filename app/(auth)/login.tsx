import CustomButton from "@/components/Button";
import FormField from "@/components/Input";
import React from "react";
import { SafeAreaView, ScrollView, StatusBar, View, Text } from "react-native";

const Login = () => {
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

export default Login;
