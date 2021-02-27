import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
  TextInput,
  ImageBackground,
} from "react-native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as SecureStore from 'expo-secure-store'

const Login = ({ navigation }) => {
  const [myemail, setEmail] = useState("");
  const [mypassword, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async function getValueFor() {
    em = await SecureStore.getItemAsync("email");
    ps = await SecureStore.getItemAsync("password");
    if ((em != null && ps != null) && (em != "")) {
      setPassword(ps)
      setEmail(em)
      setLoader(true);
      await fetch(
        `https://soop.io/api/v1/school_owner/sessions?email=${em}&password=${ps}&device_token=${"null"}`,
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success === true) {
            console.log(responseJson);
            save("email", myemail);
            save("password", mypassword);
            setEmail("");
            setPassword("");
            navigation.navigate("HomeScreen", {
              logo: responseJson.data.logo,
              id: responseJson.data.owner.id,
              obj: responseJson.data.owner,
              s_name: responseJson.data.school_name,
            });
          } else {
            setEmail("");
            setPassword("");
            Alert.alert(
              "Action Response",
              "Sorry something went wrong. Please enter your correct Email and Password and try again later.",
              [{ text: "OK, GOT IT", onPress: () => console.log("OK Pressed") }],
              { cancelable: false }
            );
            console.log("error");
          }
          setLoader(false);
        });


    }
  }
  async function checkLogin() {
    setLoader(true);
    let token_notify = "null"; //await registerForPushNotificationsAsync();
    if (myemail == "" || mypassword == "") {
      Alert.alert(
        "Empty Fields",
        "Please enter your correct Email and Password First and try again later.",
        [{ text: "OK, GOT IT", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      setLoader(false);
      return;
    }
    await fetch(
      `https://soop.io/api/v1/school_owner/sessions?email=${myemail}&password=${mypassword}&device_token=${token_notify}`,
      {
        method: "POST",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.success === true) {
          console.log(responseJson);
          save("email", myemail);
          save("password", mypassword);
          setEmail("");
          setPassword("");
          navigation.navigate("HomeScreen", {
            logo: responseJson.data.logo,
            id: responseJson.data.owner.id,
            obj: responseJson.data.owner,
            s_name: responseJson.data.school_name,
          });
        } else {
          setEmail("");
          setPassword("");
          Alert.alert(
            "Action Response",
            "Sorry something went wrong. Please enter your correct Email and Password and try again later.",
            [{ text: "OK, GOT IT", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
          console.log("error");
        }
        setLoader(false);
      });
  }

  // async function registerForPushNotificationsAsync() {
  //   let token;
  //   if (Constants.isDevice) {
  //     const {
  //       status: existingStatus,
  //     } = await Notifications.getPermissionsAsync();
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== "granted") {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== "granted") {
  //       alert("Failed to get push token for push notification!");
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //   } else {
  //     alert("Must use physical device for Push Notifications");
  //   }

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }
  //   return token;
  // }

  useEffect(() => {
    getValueFor();
  }, []
  )
  return (
    <ImageBackground
      source={require("../../Images/login_background.jpeg")}
      style={styles.container}
    >
      <Image
        style={styles.imgContainer}
        source={require("../../Images/icon.png")}
      />
      <View style={styles.inputView}>
        <TextInput
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.inputText}
          value={myemail}
          onChangeText={(text) => {
            setEmail(text);
          }}
          placeholder="Email"
          placeholderTextColor="#003f5c"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          value={mypassword}
          onChangeText={(text) => {
            setPassword(text);
          }}
          // secureTextEntry

          placeholder="Password"

          placeholderTextColor="#003f5c"
          style={styles.inputText}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => checkLogin(navigation)}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
      {loader && <ActivityIndicator size="large" color="#000000" />}
      <View style={styles.signupContainer}></View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  inputView: {
    width: "80%",
    borderWidth: 0.5,
    backgroundColor: "#fff",
    backgroundColor: "#fff",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    fontFamily: "Cochin"
  },
  imgContainer: {
    width: 200,
    height: 200,
    marginTop: -90,
    marginBottom: 70,
    borderRadius: 200
  },
  inputText: {
    height: 50,
    color: "black",
  },
  loginBtn: {
    width: "40%",
    backgroundColor: "#004EE0",
    borderRadius: 10,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 3,
  },
});

export default Login;
