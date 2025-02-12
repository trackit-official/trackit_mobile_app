import { View, Text, Dimensions, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const data = [
  {
    id: 1,
    title: "Helping you keep your financial promise to yourself",
    image: require("../../../assets/images/onboarding-1.png"),
  },
  {
    id: 2,
    title: "Set Goals, Automate Deposits, Master Your Spending",
    image: require("../../../assets/images/onboarding-2.png"),
  },
  {
    id: 3,
    title: "Track Every Naira Across All Your Accounts",
    image: require("../../../assets/images/onboarding-3.png"),
  },
];

const OnboardingScreen = () => {
  const router = useRouter();
  const flatListRef = useAnimatedRef<Animated.FlatList<any>>();
  const x = useSharedValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const onLoginPress = () => {
    router.push("/(auth)/login");
  };

  const onSignupPress = () => {
    router.push("/(auth)/signup");
  };

  const renderItem = ({ item }: { item: (typeof data)[0] }) => {
    return (
      <View className={`w-[${SCREEN_WIDTH}px] h-full bg-white`}>
        <View className="items-center px-6 mt-12">
          <Image
            source={require("../../../assets/images/Vector2.png")}
            className="w-24 h-8 mb-8"
            resizeMode="contain"
          />
          <Image
            source={item.image}
            className="w-64 h-64 mb-8"
            resizeMode="contain"
          />
          <Text className="text-2xl font-psemibold text-center text-black mb-4">
            {item.title}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(
            e.nativeEvent.contentOffset.x / SCREEN_WIDTH
          );
          setCurrentIndex(newIndex);
        }}
      />

      <View className="absolute bottom-12 left-0 right-0 px-6">
        <View className="flex-row gap-2 mb-8 justify-center">
          {data.map((_, index) => (
            <View
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-primary-500" : "bg-gray-200"
              }`}
            />
          ))}
        </View>

        <View className="flex-row gap-4">
          <TouchableOpacity
            onPress={onLoginPress}
            className="flex-1 border border-primary-500 py-4 rounded-full"
          >
            <Text className="font-psemibold text-primary-500 text-center">
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSignupPress}
            className="flex-1 bg-primary-500 py-4 rounded-full"
          >
            <Text className="font-psemibold text-white text-center">
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;
