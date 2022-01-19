import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import * as Google from "expo-google-app-auth";



export default function App() {
  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "503384578811-untujs68h3jgvf0btrhtrf4nf6mhbu9m.apps.googleusercontent.com",
        iosClientId:
          "503384578811-s30c6pq41loqgegk3rcqvtfaei37bcuh.apps.googleusercontent.com",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        setAccessToken(result.accessToken);
        
      } else {
        console.log("Permission denied");
      }
     
    } catch (e) {
      console.log(e);
    }

    getUserData();
  }

  async function getUserData() {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
      
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text style={{color: "#FFFFFF"}}>
            Bienvenido : {userInfo.name}
          </Text>
          <Text style={{color: "#FFFFFF"}}>{userInfo.email}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {accessToken ? (
        <View>
          <Text style={styles.texthome}>Bienvenido  </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Image
            style={styles.tinyLogo}
            source={{uri:'https://canteradigital.mx/cantera2020/wp-content/uploads/2020/05/CanteraLogo.png'}}
          />

          <Text style={styles.text}>Página de Registro</Text>
        </View>
      )}
      <View style={styles.containerbutton}>
      <TouchableOpacity
        style={styles.button}
        onPress={accessToken ? getUserData : signInWithGoogleAsync}
      >
        <Text style={styles.buttonText}>
          
          {accessToken ? "Detalles de cuenta" : "Iniciar con Google"}
        </Text>
      </TouchableOpacity>
      </View>

      {showUserInfo()}
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#031835",
    alignItems: "center",
    justifyContent: "center",
  },
  containerbutton:{
    flex:0.5
  },
  tinyLogo:{
    width:170,
    height:50
  },
  text: {
    marginTop:20,
    fontSize: 28,
    color: "#FFFFFF"
  },
  texthome:{
    fontSize:19,
    color: "#FFFFFF"
  },  
  button: {
    alignItems: "center",
    backgroundColor: "#4286F4",
    marginTop: 30,
    padding: 15,
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
    width: 190,
    height: 55,
  },
  buttonText: {
    color: "#FFFFFF",
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
  },

});
