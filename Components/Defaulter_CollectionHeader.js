import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Defaulter_CollectionHeader = (props) => {
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
            source={require("../Images/moneyicon.png")}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 33,
              fontWeight: "bold",
              color: "black",
            }}
          >
            {props.val1}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              opacity: 0.7,
            }}
          >
            Total Amount
          </Text>
        </View>
      </View>
      <View style={styles.itemBlock2}>
        <View style={styles.rowImage}>
          <Image
            style={{
              height: 35,
              width: 35,
              borderRadius: 9,
            }}
            source={require("../Images/defaulters.png")}
          />
        </View>
        <View>
          <Text
            style={{
              fontSize: 33,
              fontWeight: "200",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {props.val2}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "white",
              opacity: 0.7,
            }}
          >
            Total Defaulers
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "30%",
    backgroundColor: "#f5f5f5",
    flexDirection: "column",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  itemBlock: {
    backgroundColor: "#ffffff",
    width: "36%",
    height: "70%",
    borderRadius: 25,
    flexDirection: "column",
    paddingHorizontal: 10,
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  itemBlock2: {
    backgroundColor: "#004EE0",
    width: "36%",
    height: "70%",
    borderRadius: 25,
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

export default Defaulter_CollectionHeader;
