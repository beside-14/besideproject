import React from "react";
import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
// https://developers.kakao.com/ 에서 내 애플리케이션 등록 후 해당 정보 입력 후 사용!
const client_id = "5563e49be9c11f272584ea0a7c4a59f4"; //애플리케이션 등록 후 발급받은 REST API 키
const redirect_uri = "http://192.168.219.100:19006"; 
//인가 코드가 리다이렉트될 URI 
//(서버 생성 후 변경필요: code(-1004) Could not connect to the server 에러 발생, 
//                      모바일에서 접근불가능한 url 불가)

const KakaoLoginScreen = ({ navigation }) => {
  function LogInProgress(data) {
    // access code는 url에 붙어 장황하게 날아온다.
    console.log(data);

    // substring으로 url에서 code=뒤를 substring하면 된다.
    const exp = "code=";
    var condition = data.indexOf(exp);
    if (condition != -1) {
      var request_code = data.substring(condition + exp.length);
      console.log("access code :: " + request_code);

      // 토큰값 받기
      requestToken(request_code);
    }
  }

  const requestToken = async (request_code) => {
    var returnValue = "none";
    var request_token_url = "https://kauth.kakao.com/oauth/token";

    axios({
      method: "post",
      url: request_token_url,
      params: {
        grant_type: "authorization_code",
        client_id: client_id,
        redirect_uri: redirect_uri,
        code: request_code,
      },
    })
      .then(function (response) {
        console.log(response.data);

        returnValue = response.data.access_token;
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={false}
        style={{ marginTop: 10 }}
        source={{
          uri:
            "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=" +
            client_id +
            "&redirect_uri=" +
            redirect_uri,
        }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        onMessage={(event) => {
          // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
          // console.log(event)
          LogInProgress(event.nativeEvent["url"]);
        }}
      />
    </View>
  );
};

export default KakaoLoginScreen;
