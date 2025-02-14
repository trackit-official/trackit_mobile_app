import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import images from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const data = [
  {
    id: 1,
    title: "Helping you keep your financial promise to yourself",
    image: images.onboardingImage1,
  },
  {
    id: 2,
    title: "Set Goals, Automate Deposits, Master Your Spending",
    image: images.onboardingImage2,
  },
  {
    id: 3,
    title: "Track Every Naira Across All Your Accounts",
    image: images.onboardingImage3,
  },
];

const OnboardingScreen = () => {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const scrollX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      currentIndex.value = Math.round(scrollX.value / SCREEN_WIDTH);
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-red-500">
      <View className="h-full">
        <Text className="border-b-black-paleblack font-black">Onboarding</Text>
        {/* <StatusBar barStyle="dark-content" />

        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          className="flex-1"
        >
          {data.map((item) => (
            <View
              key={item.id}
              style={{ width: SCREEN_WIDTH }}
              className="bg-white"
            >
              <View className="mt-12 mb-8 px-6">
                <Image
                  source={images.Vector2}
                  className="w-[120px] h-6"
                  resizeMode="contain"
                />
              </View>

              <View className="items-center px-6">
                <Image
                  source={item.image}
                  className="w-[85vw] h-[70vw] mb-10"
                  resizeMode="contain"
                />
                <Text className="text-[28px] leading-[34px] font-semibold text-center text-gray-900 px-4">
                  {item.title}
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>

        {/* Pagination dots */}
        {/* <View className="flex-row justify-center space-x-2 mb-12">
          {data.map((_, index) => (
            <View
              key={index}
              className={`h-2 rounded-full ${
                Math.round(scrollX.value / SCREEN_WIDTH) === index
                  ? "w-6 bg-[#4CAF50]"
                  : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </View> */}

        {/* Bottom buttons */}
        {/* <View className="px-6 pb-8 space-y-4">
          <TouchableOpacity
            onPress={() => router.push("/login")}
            className="w-full h-[52px] border border-[#4CAF50] rounded-lg items-center justify-center"
          >
            <Text className="text-[#4CAF50] text-base font-medium">Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/signup")}
            className="w-full h-[52px] bg-[#4CAF50] rounded-lg items-center justify-center"
          >
            <Text className="text-white text-base font-medium">Sign up</Text>
          </TouchableOpacity>
        </View>  */}
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
