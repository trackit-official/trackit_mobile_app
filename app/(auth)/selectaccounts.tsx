import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from "@/components/Button";

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  icon: string;
}

const bankAccounts: BankAccount[] = [
  {
    id: "1",
    bankName: "Access Bank",
    accountNumber: "7638291045",
    icon: "bank",
  },
  {
    id: "2",
    bankName: "Access Bank",
    accountNumber: "8093765412",
    icon: "bank",
  },
  {
    id: "3",
    bankName: "First Bank",
    accountNumber: "5120983746",
    icon: "bank",
  },
  {
    id: "4",
    bankName: "First Bank",
    accountNumber: "4561203987",
    icon: "bank",
  },
  { id: "5", bankName: "GTB", accountNumber: "9845612307", icon: "bank" },
  {
    id: "6",
    bankName: "Moniepoint",
    accountNumber: "2309876541",
    icon: "bank",
  },
  {
    id: "7",
    bankName: "Moniepoint",
    accountNumber: "6789012345",
    icon: "bank",
  },
  { id: "8", bankName: "Opay", accountNumber: "3217890456", icon: "bank" },
];

const SelectAccounts = () => {
  const [selectedAccounts, setSelectedAccounts] = useState<Set<string>>(
    new Set()
  );
  const [selectionOrder, setSelectionOrder] = useState<string[]>([]);
  const [errorAccountId, setErrorAccountId] = useState<string | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const toggleAccount = (id: string) => {
    const newSelected = new Set(selectedAccounts);
    const newOrder = [...selectionOrder];

    if (newSelected.has(id)) {
      newSelected.delete(id);
      setErrorAccountId(null);
      const index = newOrder.indexOf(id);
      if (index > -1) {
        newOrder.splice(index, 1);
      }
    } else {
      if (newSelected.size < 2) {
        newSelected.add(id);
        newOrder.push(id);
        setErrorAccountId(null);
      } else {
        setShowUpgradeModal(true);
        return;
      }
    }
    setSelectedAccounts(newSelected);
    setSelectionOrder(newOrder);
  };

  const handleUpgrade = () => {
    // Handle upgrade logic here
    setShowUpgradeModal(false);
  };

  const getSelectionNumber = (id: string) => {
    return selectionOrder.indexOf(id) + 1;
  };

  const isFormValid = () => {
    return selectedAccounts.size === 2;
  };

  const handleContinue = () => {
    if (isFormValid()) {
      router.push("/(tabs)");
    }
  };

  const AccountCard = ({ account }: { account: BankAccount }) => (
    <TouchableOpacity
      key={account.id}
      onPress={() => toggleAccount(account.id)}
      className={`w-[48%] p-4 rounded-xl mb-4 border relative ${
        errorAccountId === account.id
          ? "border-red-500 bg-red-50"
          : selectedAccounts.has(account.id)
          ? "border-green-500 bg-green-50"
          : "border-gray-200"
      }`}
    >
      {selectedAccounts.has(account.id) && (
        <View className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full items-center justify-center z-10">
          <Text className="text-white font-pbold text-sm">
            {getSelectionNumber(account.id)}
          </Text>
        </View>
      )}
      <View className="flex-row items-center space-x-2">
        <MaterialCommunityIcons
          name={account.icon as any}
          size={20}
          color={
            errorAccountId === account.id
              ? "#EF4444"
              : selectedAccounts.has(account.id)
              ? "#22C55E"
              : "#94A3B8"
          }
        />
        <Text
          className={`text-sm ml-1 ${
            errorAccountId === account.id ? "text-red-600" : "text-gray-600"
          }`}
        >
          {account.bankName}
        </Text>
      </View>
      <Text className="text-base font-pbold mt-1">{account.accountNumber}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <View className="flex-1">
        <ScrollView className="flex-1">
          <View className="flex-col justify-center px-6 mt-16">
            <View className="mt-[50px]" />
            <Text className="text-3xl font-pbold mb-2 text-gray-900">
              You're all set Grace,
            </Text>
            <Text className="text-base font-pmedium text-gray-600 mt-2">
              We've found {bankAccounts.length} accounts connected to your BVN.
              Select the accounts you'd like to import
            </Text>
            <Text className="text-sm font-pmedium text-gray-500 mb-6">
              Please select exactly 2 accounts
            </Text>

            {errorAccountId && (
              <Text className="text-sm font-pmedium text-red-500 mb-4">
                You can only select 2 accounts
              </Text>
            )}

            <View className="flex-row flex-wrap justify-between mt-6">
              {bankAccounts.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
            </View>
          </View>
        </ScrollView>

        <View className="px-6 py-4">
          <CustomButton
            text="Continue"
            handlePress={handleContinue}
            disabled={!isFormValid()}
            isLoading={false}
            textStyles={`font-pmedium ${
              isFormValid() ? "text-white" : "text-gray-500"
            }`}
            containerStyles={`w-full ${
              isFormValid() ? "bg-primary-600" : "bg-primary-100"
            }`}
          />
        </View>

        <Modal
          visible={showUpgradeModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowUpgradeModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowUpgradeModal(false)}
            className="flex-1 bg-black/50 justify-end"
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
            >
              <View className="bg-white rounded-t-3xl p-6">
                <View className="items-center mb-6">
                  <View className="w-10 h-1 bg-gray-300 rounded-full" />
                </View>
                <Text className="text-2xl font-pbold text-gray-900 mb-2">
                  Soowrayyy! You can only import 2 accounts 😶‍🌫️
                </Text>
                <Text className="text-base font-pmedium text-gray-600 mb-6">
                  To import and effectively manage unlimited accounts of your
                  choice, upgrade for ₦350 per month.
                </Text>
                <View className="flex-row space-x-4">
                  <CustomButton
                    isLoading={false}
                    text="Continue"
                    handlePress={() => setShowUpgradeModal(false)}
                    containerStyles="flex-1 mr-3 bg-white border border-gray-200"
                    textStyles="text-gray-900"
                  />
                  <CustomButton
                    text="Upgrade"
                    isLoading={false}
                    handlePress={handleUpgrade}
                    containerStyles="flex-1 bg-primary-600"
                    textStyles="text-white"
                  />
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default SelectAccounts;
