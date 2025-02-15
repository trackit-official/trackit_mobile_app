import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { router } from "expo-router";
import CustomButton from "@/components/Button";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Clipboard from "expo-clipboard";
const VerifyMail = () => {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const confettiRef = useRef<any>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [pasteMessage, setPasteMessage] = useState("");
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const cleanedText = value.replace(/[^0-9]/g, "").slice(0, 6);
      setPin(prev => {
        const newPin = [...prev];
        cleanedText.split("").forEach((digit, i) => {
          if (i < 6) newPin[i] = digit;
        });
        return newPin;
      });
      inputRefs.current[index]?.blur();
    } else {
      // Handle single digit
      setPin(prev => {
        const newPin = [...prev];
        newPin[index] = value;
        return newPin;
      });
      
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
    setIsError(false);
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace") {
      setPin(prev => {
        const newPin = [...prev];
        if (newPin[index] === "" && index > 0) {
          newPin[index - 1] = "";
          setTimeout(() => inputRefs.current[index - 1]?.focus(), 0);
        } else {
          newPin[index] = "";
        }
        return newPin;
      });
    }
  };

  const verifyPin = async () => {
    setIsLoading(true);
    const enteredPin = pin.join("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (enteredPin === "111111") {
      setIsLoading(false);
      confettiRef.current?.start();
      // Wait for confetti to play
      await new Promise((resolve) => setTimeout(resolve, 2500));
      router.push("/(auth)/phone");
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <View className="mt-[50px]" />
        <View className="px-6 mt-16">
          <Text className="text-3xl font-pbold mb-2 text-gray-900">
            Verify your email
          </Text>
          <Text className="text-base font-psemibold text-gray-600 mt-2 mb-6">
            A 6 digit OTP was sent to {"\n"}
            <Text className="text-primary-600">jesumuyiwago@gmail.com</Text>.
            Input the digit here to continue.
          </Text>

          <View className="flex-row items-center justify-between mb-2">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <TextInput
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className={`w-14 h-14 border-2 rounded-lg text-center text-2xl font-pbold ${
                      isError
                        ? "border-red-500 text-red-500"
                        : pin[index]
                        ? "border-primary-600 text-primary-600"
                        : focusedIndex === index
                        ? "border-primary-600"
                        : "border-gray-200 text-gray-900"
                    }`}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={pin[index]}
                    onChangeText={(value) => {
                      handlePinChange(index, value);
                    }}
                    onKeyPress={({ nativeEvent: { key } }) =>
                      handleKeyPress(index, key)
                    }
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                  />
                ) : (
                  <TextInput
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className={`w-14 h-14 border-2 rounded-lg text-center text-2xl font-pbold ${
                      isError
                        ? "border-red-500 text-red-500"
                        : pin[index]
                        ? "border-primary-600 text-primary-600"
                        : focusedIndex === index
                        ? "border-primary-600"
                        : "border-gray-200 text-gray-900"
                    }`}
                    maxLength={1}
                    keyboardType="number-pad"
                    value={pin[index]}
                    onChangeText={(value) => {
                      handlePinChange(index, value);
                    }}
                    onKeyPress={({ nativeEvent: { key } }) =>
                      handleKeyPress(index, key)
                    }
                    onFocus={() => setFocusedIndex(index)}
                    onBlur={() => setFocusedIndex(null)}
                  />
                )}
                {index === 2 && (
                  <Text className="text-2xl font-pbold text-gray-400 mx-2">
                    -
                  </Text>
                )}
              </React.Fragment>
            ))}
          </View>
          {isError && (
            <Text className="text-red-500 text-sm font-pmedium mb-6">
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
              pin.every((digit) => digit !== "")
                ? "text-white"
                : "text-gray-900"
            }`}
            containerStyles={`w-full ${
              pin.every((digit) => digit !== "")
                ? "bg-primary-600"
                : "bg-primary-100"
            }`}
            disabled={!pin.every((digit) => digit !== "")}
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

export default VerifyMail;
