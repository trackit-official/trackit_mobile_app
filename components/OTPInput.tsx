import React, { useRef, useState } from "react";
import { View, TextInput, Keyboard, Text } from "react-native";

interface OTPInputProps {
  length: number;
  onComplete: (code: string) => void;
  isError?: boolean;
}

const OTPInput = ({ length, onComplete, isError }: OTPInputProps) => {
  const [code, setCode] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text.length === 1 && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    const isComplete = newCode.every(
      (digit) => digit !== "" && digit.length === 1
    );
    if (isComplete) {
      onComplete(newCode.join(""));
      Keyboard.dismiss();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    if (event.nativeEvent.key === "Backspace" && index > 0 && !code[index]) {
      inputRefs.current[index - 1]?.focus();
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
    }
  };

  return (
    <View className="flex flex-row justify-between w-4/5">
      {[...Array(length)].map((_, index) => (
        <React.Fragment key={index}>
          <TextInput
            ref={(ref) => {
              if (ref) inputRefs.current[index] = ref;
            }}
            className={`w-12 h-14 mx-1 border-2 rounded-lg text-2xl text-center font-bold
              ${!code[index] ? "border-gray-300" : ""}
              ${
                code[index] && !isError ? "border-green-500 text-green-500" : ""
              }
              ${code[index] && isError ? "border-red-500 text-red-500" : ""}`}
            maxLength={1}
            keyboardType="number-pad"
            value={code[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            selectTextOnFocus
          />
          {index === 2 && (
            <Text className="text-2xl font-bold text-gray-400 mx-2 self-center">
              -
            </Text>
          )}
        </React.Fragment>
      ))}
    </View>
  );
};

export default OTPInput;
