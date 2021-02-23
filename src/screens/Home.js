import React from "react";

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
  const obj = navigation.getParam("obj");
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
            width: 100,
            height: 100,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: "#000",
          }}
          source={require("../../Images/profile.jpg")}
        />
        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 10 }}>
          {obj.name}
        </Text>
        <Text style={{ fontSize: 15, color: "gray" }}>Owner / Principal</Text>
      </View>
      <ScrollView
        style={{
          backgroundColor: "#f6f6f6f6",
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
        }}
      >
        <Pressable
          style={styles.rowContainer}
          onPress={() => {
            // navigation.navigate("BranchTeacher", {
            //   id: 13,
            //   bid: 13,
            //   date: "2020-10-10",
            // })
            navigation.navigate("TeacherAttendance",
            {
              id:myid,
            
            }
            );
          }}
        >
          <View style={styles.rowImage}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
              }}
              source={require("../../Images/collection.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 2,
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                height: "100%",
                paddingTop: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  paddingBottom: 2,
                  color: "#101112",
                }}
              >
                Teacher Attendance
              </Text>
              <Text style={{ fontSize: 13, color: "gray" }}>{x}</Text>
            </View>
           
          </View>
        </Pressable>
        <Pressable
          style={styles.rowContainer}
          onPress={() => {
            // navigation.navigate("BranchStaff", {
            //   id: 13,
            //   bid: 13,
            //   date: "2020-10-10",
            // })
             navigation.navigate("StaffAttendance"
             , {
               id : myid,
             });
          }}
        >
          <View style={styles.rowImage}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
              }}
              source={require("../../Images/collection.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 2,
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                height: "100%",
                paddingTop: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  paddingBottom: 2,
                  color: "#101112",
                }}
              >
                Staff Attendance
              </Text>
              <Text style={{ fontSize: 13, color: "gray" }}>{x}</Text>
              </View>
            
          </View>
        </Pressable>

        <Pressable
          style={styles.rowContainer}
          onPress={() => {
            // navigation.navigate("BranchStaff", {
            //   id: 13,
            //   bid: 13,
            //   date: "2020-10-10",
            // })
             navigation.navigate("DefaulerS"
             , {
               id : myid,
             });
          }}
        >
          <View style={styles.rowImage}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
              }}
              source={require("../../Images/collection.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 2,
              paddingLeft: 10,
            }}
          >
            <View
              style={{
                height: "100%",
                paddingTop: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  paddingBottom: 2,
                  color: "#101112",
                }}
              >
                Defaulters
              </Text>
              <Text style={{ fontSize: 13, color: "gray" }}>{x}</Text>
              </View>
            
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f6f6f6",
    marginBottom: 120,
    height: "100%",
  },
  Topcontainer: {
    height: "30%",
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  imageInitials: {
    marginBottom: 5,
    width: 95,
    height: 95,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#ffc75f",
    justifyContent: "center",
    alignItems: "center",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 25,
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 4,
  },
  rowImage: {
    backgroundColor: "#CDDDF5",
    padding: 10,
    borderRadius: 20,
  },
});

export default Home;
