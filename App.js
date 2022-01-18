import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';

export default function App() {

  const [accessToken, setAccessToken] = React.useState();
  const [userInfo, setUserInfo] = React.useState();

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: "503384578811-untujs68h3jgvf0btrhtrf4nf6mhbu9m.apps.googleusercontent.com",
        iosClientId: "503384578811-s30c6pq41loqgegk3rcqvtfaei37bcuh.apps.googleusercontent.com",
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        setAccessToken(result.accessToken);
      } else {
        console.log("Permission denied");
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getUserData() {
    let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}`}
    });

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={styles.userInfo}>
          <Image source={{ uri: userInfo.picture }} style={styles.profilePic} />
          <Text>Welcome {userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      );
    }
  }

  return (
    <View style={styles.container}>
      {showUserInfo()}
      <Button title={accessToken ? "Obtener Detalles de cuenta" : "Login"} onPress={accessToken ? getUserData : signInWithGoogleAsync} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
    width: 50,
    height: 50
  }
});
