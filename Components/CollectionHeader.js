import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CollectionHeader = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.val}>{props.val1}</Text>
        <Text style={styles.valname}>{props.heading1}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.val}>{props.val2}</Text>
        <Text style={styles.valname}>{props.heading2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "12%",
    paddingVertical: 10,
    backgroundColor: "#163b70",
    alignItems: "center",
    // backgroundColor: "#153e90",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  block: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    width: "38%",
    elevation: 7,
  },
  val: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#163b70",
  },
  valname: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#163b70",
  },
});

export default CollectionHeader;
