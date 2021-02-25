import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const TopAttendanceHeader = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemBlock}>
        <View style={styles.rowImage}>
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 9,
            }}
            source={require("../Images/present.png")}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 25,
              color: "gray",
              fontWeight: "200",
              fontWeight: "bold",
              color: "green",
              opacity: 0.7,
            }}
          >
            {props.present}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              color: "green",
              opacity: 0.7,
            }}
          >
            Presents
          </Text>
        </View>
      </View>
      <View style={styles.itemBlock}>
        <View style={styles.rowImage}>
          <Image
            style={{
              height: 35,
              width: 35,
              borderRadius: 9,
            }}
            source={require("../Images/absent.png")}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "red",
              opacity: 0.7,
            }}
          >
            {props.absent}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "red",
              opacity: 0.7,
            }}
          >
            Absents
          </Text>
        </View>
      </View>
      <View style={styles.itemBlock}>
        <View style={styles.rowImage}>
          <Image
            style={{
              height: 38,
              width: 38,
              borderRadius: 9,
            }}
            source={require("../Images/leave.png")}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "200",
              fontWeight: "bold",

              opacity: 0.7,
              color: "orange",
            }}
          >
           {props.leave}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "orange",
              opacity: 0.7,
            }}
          >
            Leaves
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "35%",
    backgroundColor: "#f6f6f6f6",
    flexDirection: "column",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 10,
    elevation: 10,
    borderRadius: 20,
  },
  itemBlock: {
    backgroundColor: "#ffffff",
    width: "25%",
    height: "60%",
    elevation: 10,
    borderRadius: 10,
    marginTop: "-15%",
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  rowImage: {
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    width: 38,
  },
});

export default TopAttendanceHeader;
