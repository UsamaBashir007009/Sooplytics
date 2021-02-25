import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const AdmissionHeader = (props) => {
  return (
    <View style={styles.container}>
      
      <View style={styles.itemBlock}>
        <View style={styles.rowImage}>
          <Image
            style={{
              height: 35,
              width: 35,
              borderRadius: 9,
            }}
            source={require("../Images/total.png")}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 27,
              fontWeight: "bold",
              color: "#004EE0",
              opacity: 0.7,
            }}
          >
            {props.val1}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#004EE0",
              opacity: 0.7,
            }}
          >
            Total
          </Text>
        </View>
      </View>
      <View style={styles.itemBlock}>
        <View style={styles.rowImage}>
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 9,
            }}
            source={require("../Images/admit.png")}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 27,
              color: "gray",
              fontWeight: "200",
              fontWeight: "bold",
              color: "green",
              opacity: 0.7,
            }}
          >
            {props.val2}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              color: "green",
              opacity: 0.7,
            }}
          >
            Admitted
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
            source={require("../Images/pending.png")}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 27,
              fontWeight: "200",
              fontWeight: "bold",

              opacity: 0.7,
              color: "orange",
            }}
          >
           {props.val3}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "orange",
              opacity: 0.7,
            }}
          >
            Pending
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "25%",
    flexDirection: "column",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: 5,
    borderRadius: 20,
  },
  itemBlock: {
    backgroundColor: "#ffffff",
    width: "25%",
    height: "80%",
    elevation: 10,
    borderRadius: 10,
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


export default AdmissionHeader
