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
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import images from "@/constants/images";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const data = [
  {
    id: 1,
    title: "Helping you keep your financial promise to yourself.",
    image: images.onboardingImage1,
  },
  {
    id: 2,
    title: "Set Goals, Automate Deposits, Master Your Spending.",
    image: images.onboardingImage2,
  },
  {
    id: 3,
    title: "Track Every Naira Across All Your Accounts.",
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
    <SafeAreaView className="flex-1 bg-white ">
      <View className="h-full">
        <StatusBar barStyle="dark-content" />

        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          className="flex-1"
        >
          {data.map((item: any) => (
            <View
              key={item.id}
              style={{ width: SCREEN_WIDTH }}
              className="bg-white"
            >
              <View className="mt-10 flex  items-center mb-[90px] px-6">
                <Image
                  source={images.Vector}
                  className="w-[130px] h-10"
                  resizeMode="contain"
                />
              </View>

              <View className="items-center px-6">
                <Image
                  source={item.image}
                  className="w-[85vw] h-[70vw] mb-12"
                  resizeMode="contain"
                />
                <Text className="text-[32px] font-pbold text-center text-gray-900 px-4">
                  {item.title}
                </Text>
              </View>

              <View className="flex-row justify-center items-center mt-5 mb-10">
                {data.map((_, index) => {
                  const dotStyle = useAnimatedStyle(() => {
                    const isActive =
                      Math.round(scrollX.value / SCREEN_WIDTH) === index;
                    return {
                      width: withSpring(isActive ? 24 : 8),
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: isActive ? "#4CAF50" : "#E5E7EB",
                      marginHorizontal: 4,
                    };
                  });

                  return <Animated.View key={index} style={dotStyle} />;
                })}
              </View>
            </View>
          ))}
        </Animated.ScrollView>

        <View className="px-6 pb-8 flex-row justify-between space-y-3">
          <TouchableOpacity
            onPress={() => router.push("/login")}
            className="w-[48%] h-[52px] border-2 border-primary-700 rounded-lg items-center justify-center"
          >
            <Text className="text-[#4CAF50] text-base font-pbold">Log in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/signup")}
            className="w-[48%] h-[52px] bg-[#4CAF50] rounded-lg items-center justify-center"
          >
            <Text className="text-twhite-awhite  text-base font-pbold">
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
