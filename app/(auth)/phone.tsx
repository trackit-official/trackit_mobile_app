import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState, useRef } from "react";
import { router } from "expo-router";
import CustomButton from "@/components/Button";
import ConfettiCannon from "react-native-confetti-cannon";
import OTPInput from "@/components/OTPInput";

const VerifyPhone = () => {
  const [pin, setPin] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const confettiRef = useRef<any>(null);

  const handleComplete = (code: string) => {
    setPin(code);
    setIsError(false);
  };

  const verifyPin = async () => {
    try {
      if (pin.length !== 6) return;
      setIsLoading(true);
      setIsError(false);

      // For demo purposes, checking hardcoded pin
      if (pin === "111111") {
        setIsLoading(false);
        confettiRef.current?.start();

        // Wait for confetti animation to complete
        await new Promise((resolve) => setTimeout(resolve, 2500));
        router.push("/(auth)/bvn"); // Changed navigation destination
      } else {
        throw new Error("Invalid PIN");
      }
    } catch (error) {
      setIsError(true);
      setPin("");
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
            Verify your phone
          </Text>
          <Text className="text-base font-psemibold text-gray-600 mt-2 mb-6">
            A 6 digit OTP was sent to {"\n"}
            <Text className="text-primary-600">+234 812 345 6789</Text>. Input
            the digit here to continue.
          </Text>

          <OTPInput length={6} onComplete={handleComplete} isError={isError} />

          {isError && (
            <Text className="text-red-500 text-sm mt-3 font-pmedium mb-6">
              Invalid verification code. Please try again.
            </Text>
          )}
        </View>

        <View className="mt-auto px-6 py-4">
          <CustomButton
            text="Continue"
            handlePress={verifyPin}
            isLoading={isLoading}
            textStyles={`font-pmedium  ${
              pin.length === 6 ? "text-white" : "text-gray-900"
            }`}
            containerStyles={`w-full ${
              pin.length === 6 ? "bg-primary-600" : "bg-primary-100"
            }`}
            disabled={pin.length !== 6}
          />
        </View>

        <ConfettiCannon
          ref={confettiRef}
          count={200}
          origin={{ x: -10, y: 0 }}
          fallSpeed={3000}
          autoStart={false}
          fadeOut={true}
          explosionSpeed={350}
        />
      </View>
    </SafeAreaView>
  );
};

export default VerifyPhone;
