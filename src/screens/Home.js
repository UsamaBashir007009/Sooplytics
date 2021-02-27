import React from "react";

import * as SecureStore from 'expo-secure-store'

import { Pressable, ScrollView } from "react-native";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
const Home = ({ navigation }) => {
  const myid = navigation.getParam("id");
  const logo = navigation.getParam("logo");
  const obj = navigation.getParam("obj");
  const s_name = navigation.getParam("s_name");

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }
  
  function logout()
  {
    save("email", "");
    save("password","");
    navigation.navigate("LoginScreen")
  }


  var d = new Date();
  const x =
    d.getFullYear() +
    "-" +
    (d.getMonth() + 1) +
    "-" +
    d.getDate();
  return (
    <View style={styles.container}>
      <View style={styles.Topcontainer}>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 90,
            padding: 2,
            borderWidth: 0,
            borderColor: "gray",
            marginTop: 8,
            resizeMode: "contain"

          }}
          source={{uri:logo}}
        />
        <View style={styles.textPortion}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10, color: "#fff" }}>
            {obj.name}
          </Text>
          <Text style={{ fontSize: 13, color: "#e8eaf6" }}>Owner / Principal</Text>
          <View style={{ marginTop: 10, flexDirection: "row" }}>
            <Image
              style={{
                width: 15,
                height: 15,
                marginTop: 1,
                marginRight: 5

              }}
              source={require("../../Images/map.png")}
            />
            <Text style={{ color: "#e8eaf6" }}>Pakistan</Text>
          </View>

          <Text style={{ marginTop: 10, marginLeft: 3, fontSize: 15, fontWeight: "bold", color: "#fff" }}>Institution</Text>
          <Text style={{ marginTop: 10, marginLeft: 3, fontSize: 15, color: "#e8eaf6" }}>{s_name}</Text>

        </View>
        {/* <View  style={{
        }}> */}
        <Pressable 
          onPress={()=> logout()}
          style={{
          backgroundColor:"white",
                padding:5,
                marginTop:8,
                alignItems:"center",
                justifyContent:"center",
                width: 40,
                height: 40,
                borderRadius:50,}}>
          <Image
        
            style={
              {
                width: 30,
                height: 30,

              }
            }
            source={require("../../Images/logout.png")}
          />
          </Pressable>
          {/* <View style={{flex:1}}>

          </View>
        </View> */}

      </View>

      <ScrollView
        style={{
          backgroundColor: "#e3f2fd",
          paddingTop: 20,
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          paddingHorizontal: 20
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.row_item}
            onPress={() =>
              navigation.navigate("TeacherAttendance", { id: myid })
            }
          >
            <View style={{ backgroundColor: "#E3E7EF", padding: 10, borderRadius: 10 }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 6 }}
                source={require("../../Images/u1.png")}
              />
            </View>
            <Text style={{ fontSize: 14, marginTop: 7, }}>
              Teacher Attendance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.row_item}
            onPress={() => navigation.navigate("StaffAttendance", { id: myid })}
          >
            <View style={{ backgroundColor: "#E3E7EF", padding: 10, borderRadius: 10 }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 9 }}
                source={require("../../Images/t1.png")}
              />
            </View>
            <Text style={{ fontSize: 14, marginTop: 7, }}>Staff Attendance</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.row_item}
            onPress={() => navigation.navigate("ColScreen", { id: myid })}
          >
            <View style={{ backgroundColor: "#E3E7EF", padding: 10, borderRadius: 10 }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 9 }}
                source={require("../../Images/c1.png")}
              />
            </View>
            <Text style={{ fontSize: 14, marginTop: 7 }}>
              Collections
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.row_item}
            onPress={() => navigation.navigate("DefaulerS", { id: myid })}
          >
            <View style={{ backgroundColor: "#E3E7EF", padding: 10, borderRadius: 10 }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 9 }}
                source={require("../../Images/m1.png")}
              />

            </View>
            <Text
              style={{
                marginTop: 7,
                alignSelf: "center",
                fontSize: 14,
              }}
            >
              Defaulter
              </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.row_item}
            onPress={() => navigation.navigate("Admission", { id: myid })}
          >
            <View style={{ backgroundColor: "#E3E7EF", padding: 10, borderRadius: 10 }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 9 }}
                source={require("../../Images/a1.png")}
              />

            </View>
            <Text
              style={{
                marginTop: 7,
                alignSelf: "center",
                fontSize: 15,
              }}
            >
              Admissions
              </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.brow_item}
          //  onPress={() => navigation.navigate("ColScreen", { id: myid })}
          >
            {/* <View style={{backgroundColor:"#E3E7EF", padding:10 , borderRadius:10}}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 9 }}
                source={require("../../Images/c1.png")}
              />
            </View>
            <Text style={{  fontSize: 15, marginTop: 7  }}>
              Inquiries
            </Text> */}
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e3f2fd",
    marginBottom: 120,
    height: "100%",
  },
  Topcontainer: {
    height: "23%",
    marginHorizontal: 30,
    paddingTop: 20,
    backgroundColor: "#004EE0",
    flexDirection: "row",
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 55

  },
  textPortion: {
    paddingLeft: 15,
    flex: 1
  },
  row_item: {
    backgroundColor: "#fff",
    width: "45%",
    height: 160,
    marginTop: 5,
    borderRadius: 30,
    justifyContent: "center",
    marginBottom: 10,
    alignItems: "center",
  },
  brow_item: {
    //backgroundColor: "#fff",
    width: "45%",
    height: 160,
    marginTop: 5,
    borderRadius: 30,
    justifyContent: "center",
    marginBottom: 10,
    alignItems: "center",
  },


});

export default Home;
