import React from "react";
import { View, Button } from "react-native";

function LoginScreen({ navigation }) {
  return (
    <View>
      <Button title="Sign Up" onPress={() => navigation.navigate("Signup")} />
      <Button title="Kakao" onPress={() => navigation.navigate("Kakao")} />
    </View>
  );
}

export default LoginScreen;
