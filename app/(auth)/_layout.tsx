import { View, Text } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
interface Props {
  name: string;
}
const AuthLayout = () => {
  return (
    <View className="flex-1 bg-white">
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "white" },
        }}
      >
        <Stack.Screen
          name="login"
          options={{
            headerTitleAlign: "center",
            title: "",
            headerShadowVisible: false,
            //   headerShown: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()} // Navigate back using router
                style={{
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left" // Use the back arrow icon
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="signup"
          options={{
            headerTitleAlign: "center",
            title: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()} // Navigate back using router
                style={{
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left" // Use the back arrow icon
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="password"
          options={{
            headerTitleAlign: "center",
            title: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()} // Navigate back using router
                style={{
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left" // Use the back arrow icon
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="verifymail"
          options={{
            headerTitleAlign: "center",
            title: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()} // Navigate back using router
                style={{
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left" // Use the back arrow icon
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="phone"
          options={{
            headerTitleAlign: "center",
            title: "",
            headerShadowVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()} // Navigate back using router
                style={{
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left" // Use the back arrow icon
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="bvn"
          options={{
            headerTitleAlign: "center",
            title: "",
            headerShadowVisible: false,
            //   headerShown: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()} // Navigate back using router
                style={{
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left" // Use the back arrow icon
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="verifyuserinfo"
          options={{
            headerTitleAlign: "center",
            title: "",
            headerShadowVisible: false,
            //   headerShown: false,
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.back()} // Navigate back using router
                style={{
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: "black",
                  borderRadius: 10,
                  padding: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-left" // Use the back arrow icon
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </View>
  );
};

export default AuthLayout;
