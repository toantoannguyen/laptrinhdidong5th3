import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Màn hình đăng nhập
const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  // Kiểm tra số điện thoại Việt Nam (10 chữ số, bắt đầu bằng 03, 05, 07, 08, 09)
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
    return phoneRegex.test(number);
  };

  const handleContinue = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Số điện thoại không đúng định dạng. Vui lòng nhập lại");
    } else {
      setError("");
      // Chuyển sang màn hình thành công khi validate thành công
      navigation.navigate("Success");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>
        Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản OneHousing Pro
      </Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="0934"
        keyboardType="numeric"
        maxLength={10}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

// Màn hình thành công
const SuccessScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập thành công!</Text>
      <Text style={styles.message}>Chào mừng bạn đến với OneHousing Pro.</Text>
    </View>
  );
};

// Tạo stack navigator
const Stack = createStackNavigator();

// Ứng dụng chính
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Đăng nhập" }}
        />
        <Stack.Screen
          name="Success"
          component={SuccessScreen}
          options={{ title: "Thành công" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    fontSize: 18,
    padding: 10,
    textAlign: "center",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
