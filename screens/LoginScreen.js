import React from "react";
import { View, Button, StyleSheet, TextInput, TouchableOpacity, Image} from "react-native";

function LoginScreen({ navigation }) {
  const [ id, onChangeID] = React.useState('');
  const [ pw, onChangePW] = React.useState('') 
  return (
    <View style={{flex:1}}>
      <View style={styles.container}>
        <TextInput style={styles.input} onChangeText={onChangeID} value={id}/>
        <TextInput style={styles.input} onChangeText={onChangePW} value={pw}/>
        <Button style={styles.buttonSign} title="Login" onPress={() => navigation.navigate("Login")}/>
      </View>
      <View style={styles.container}>
        <Button style={styles.buttonSign} title="Sign Up" onPress={() => navigation.navigate("Signup")} />
        <TouchableOpacity style={styles.buttonAppleStyle} activeOpacity={0.5} onPress={() => navigation.navigate("Kakao")}>
          <Image source={require('../assets/kakao_login_medium_wide.png')}/>
        </TouchableOpacity>

      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    marginTop: 30,
    padding: 30
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor:'white'
  },
  buttonKakaoStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderRadius:5,
    margin:5
  },
  buttonSign: {
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor:'rgb(6, 188, 238)',
    borderWidth:0.5,
    margin:5,
    height:40,
    borderRadius:5
  }
})

export default LoginScreen;
