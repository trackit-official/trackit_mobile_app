import { SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import FormField from "@/components/Input";
import CustomButton from "@/components/Button";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";

interface BVNData {
  bvn: string;
}

const BVN = () => {
  const [userData, setUserData] = useState<BVNData>({
    bvn: "",
  });
  const [isTyping, setIsTyping] = useState(false);

  const [bvnConditions, setBvnConditions] = useState({
    exactLength: false,
    onlyNumbers: false,
  });

  const validateBVN = (bvn: string) => {
    const conditions = {
      exactLength: bvn.length === 11,
      onlyNumbers: /^\d+$/.test(bvn),
    };
    setBvnConditions(conditions);
    return Object.values(conditions).every(Boolean);
  };

  const handleBVNChange = (value: string) => {
    setIsTyping(value.length > 0);
    setUserData((prev) => ({ ...prev, bvn: value }));
    validateBVN(value);
  };

  const isFormValid = () => {
    return Object.values(bvnConditions).every(Boolean);
  };

  const BVNCondition = ({ met, text }: { met: boolean; text: string }) => (
    <View className="flex-row items-center space-x-2 mb-3">
      {isTyping ? (
        met ? (
          <FontAwesome5 name="check-circle" size={20} color="#22C55E" />
        ) : (
          <MaterialCommunityIcons
            name="information"
            size={20}
            color="#EF4444"
          />
        )
      ) : (
        <MaterialIcons name="check-circle" size={20} color="#94A3B8" />
      )}
      <Text
        className={`ml-1 font-pmedium ${
          !isTyping ? "text-gray-400" : met ? "text-gray-900" : "text-gray-900"
        }`}
      >
        {text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <ScrollView className="flex-1">
          <View className="flex-col justify-center px-6 mt-16">
            <View className="mt-[50px]" />
            <Text className="text-3xl font-pbold mb-2 text-gray-900">
              BVN Number
            </Text>
            <Text className="text-base font-pmedium text-gray-600 mt-2 mb-6">
              Lets verify your identity with your Bank Verification Number (BVN)
            </Text>

            <FormField
              title="BVN"
              value={userData.bvn}
              placeholder="00000000000"
              handleChangeText={handleBVNChange}
              otherStyles="mb-6"
              keyboardType="numeric"
            />
          </View>
        </ScrollView>

        <View className="px-6 py-4 border-gray-200">
          <CustomButton
            text="Continue"
            handlePress={() => {
              if (isFormValid()) {
                router.push("/(auth)/verifyuserinfo");
              }
            }}
            isLoading={false}
            textStyles={`font-pmedium ${
              isFormValid() ? "text-white" : "text-gray-500"
            }`}
            containerStyles={`w-full ${
              isFormValid() ? "bg-primary-600" : "bg-primary-100"
            }`}
            disabled={!isFormValid()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BVN;
