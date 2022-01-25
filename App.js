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
import img from './assets/1589983314924.jpeg';
import icon from './assets/logog.png';

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
        <View style={styles.container}>
          <Text style={styles.texthome}>Bienvenido  </Text>
          <Image 
            style={styles.tinyLogohome}
            source={img}
          />
          <Text style={{fontSize:15,color: "#FFFFFF", marginTop:30}}>
          ¿QUIÉNES SOMOS? 
          </Text>
          <Text style={{fontSize:14, color: "#FFFFFF"}}>
          Somos un equipo de expertos que ofrecen <Text style={{fontSize:14, color:"#E01747"}}> soluciones digitales</Text> que impactan.
            
          </Text>
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
        <Image
              style={styles.logogmail}
              source={icon}
          /> 
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
    width:185,
    height:55
    
  },
  logogmail:{
    
    width:50,
    height:30
  },
  tinyLogohome:{
    width:170,
    height:100,
    borderRadius:80
  },  
  text: {
    marginTop:20,
    fontSize: 28,
    color: "#FFFFFF"
  },
  texthome:{
    marginLeft:20,
    fontSize:20,
    color: "#FFFFFF"
  },  
  button: {
    alignItems: "center",
    backgroundColor: "#4286F4",
    marginTop: 30,
    padding: 15,
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
    width: 230,
    height: 70,
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
