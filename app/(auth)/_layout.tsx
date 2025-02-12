import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
interface Props {
  name: string;
}
const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerTitleAlign: "center",
          title: "Sign In",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitleAlign: "center",
          title: "Sign Up",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="purpose"
        options={{
          headerShown: false,
          statusBarHidden: false,
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
