import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import axios from "axios";

const baseUrl = "http://";
const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [password2, confirmPassword] = useState('');

  const serverUrl = "http://serverAddress";  //백엔드 서버 주소 넣어주세요.
  const handleSignUp = () => {
    const userInfo = { username, email, password };
    console.log("Signed up : ", userInfo);

    const callApi = async () => {
      const response = await axios.post(serverUrl, userInfo).then((res) => {
        console.log(res);
        if (res == "success") {
          // 회원가입 성공
        } else {
          // 회원가입 실패 
        }
      });
    };
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.header}> 회원가입 </Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="User Name"
          placeholderTextColor="#83817A"
          value={username}
          onChangeText={(name) => setUsername(name)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#83817A"
          keyboardType="email-address"
          value={email}
          onChangeText={(mail) => setEmail(mail)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#83817A"
          secureTextEntry={true}
          value={password}
          onChangeText={(pwd) => setPassword(pwd)}
        />
        <Button
          style={styles.signupBtn}
          title="SIGN UP"
          onPress={handleSignUp}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    felx: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 100,
    fontSize: 38,
    fontWeight: "500",
    alignContent: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
});
export default SignupScreen;