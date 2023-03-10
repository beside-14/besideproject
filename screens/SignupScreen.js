import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import { validateEmail, validatePassword, alert } from "../util";
import { TouchableOpacity } from "react-native-gesture-handler";

const baseUrl = "http://serverAddress";
const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameState, setNmState] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeNameHandler = (e) => {
    setUsername(e.target.value);
  };

  const handleConfirmName = (e) => {
    setNmState(e.target.value);
    //중복체크
  };

  const handleSignUp = (navigation) => {
    const userInfo = { username, email, password };
    console.log("Signed up : ", userInfo);

    if (
      nameState === false ||
      email === "" ||
      password === "" ||
      confirmPassword == ""
    ) {
      setErrorMessage("Please fill out all fields");
      console.log(errorMessage);
      alert("Form Check", errorMessage);
      return;
    }
    //비밀번호 형식 체크
    if (validatePassword(password)) {
      setErrorMessage(
        "Password must be at least 8 characters, one number, one lowercase."
      );
      alert("Password validation", errorMessage);
      return;
    }

    //확인용 비밀번호와 비밀번호의 일치 체크
    if (password != confirmPassword) {
      setErrorMessage("Passwords do not match. Please check back.");
      alert("Confirm password", errorMessage);
      return;
    }
    //이메일 유효성 체크
    if (!validateEmail(email)) {
      setErrorMessage("Please check Email address format.");
      alert("Email validation", errorMessage);
      return;
    }
    setErrorMessage("");

    if (errorMessage === "" && nameState === true) {
      const callApi = async () => {
        const response = await axios.post(baseUrl, userInfo).then((res) => {
          console.log(res);
          if (res == "success") {
            // 회원가입 성공
            navigation.navigate("HomeScreen");
          } else {
            // 회원가입 실패
          }
        });
      };
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <Text style={styles.header}> 회원가입 </Text>
      </View>
      <View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.nameInput}
            placeholder="User Name"
            placeholderTextColor="#83817A"
            value={username}
            onChangeText={onChangeNameHandler}
          />
          <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmName}>
            <Text>확인</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#83817A"
          keyboardType="email-address"
          value={email}
          onChangeText={(mail) => setEmail(mail)}
        />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#83817A"
            value={password}
            secureTextEntry={true}
            onChangeText={(pwd) => setPassword(pwd)}
          />
          <Text>Combine numbers, lowercase and be at least 8 characters</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#83817A"
            value={confirmPassword}
            secureTextEntry={true}
            onChangeText={(pwd) => setConfirmPassword(pwd)}
          />
        </View>
        <TouchableOpacity
          style={styles.signupBtn}
          onPress={handleSignUp}
        >
          <Text>SIGN UP</Text>
          </TouchableOpacity>
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
    flex: 4,
  },
  nameInput: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    flex: 1,
  },
  
  signupBtn: {
    alignItems: "center",
    backgroundColor: "ivory",
    borderWidth: 0.5,
    margin: 5,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
  },

  confirmBtn : {
    alignItems: "center",
    backgroundColor: "ivory",
    borderWidth: 0.5,
    margin: 5,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
  }

});
export default SignupScreen;
