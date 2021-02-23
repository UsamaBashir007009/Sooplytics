import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Defaulter_CollectionRow = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{props.name}</Text>
      <View style={styles.innerCon}>
        <View style={styles.block}>
          <Text style={styles.val}>{props.amount}</Text>
          <Text style={styles.valname}>{props.head1}</Text>
        </View>
        <View style={styles.block}>
          <Text style={styles.val}>{props.defaulters}</Text>
          <Text style={styles.valname}>{props.head2}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderBottomWidth: 1,
    borderRadius: 17,
    marginHorizontal: 7,
    marginVertical: 3,
    backgroundColor: "#fff",
    borderBottomColor: "grey",
    elevation: 4,
  },
  block: {
    backgroundColor: "#163b70",
    //backgroundColor: "#ffcc29",
    borderRadius: 14,
    marginVertical: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    elevation: 9,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
    elevation: 5,

    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,

    textAlign: "center",
    paddingVertical: 3,
    backgroundColor: "#c9d1d3",
  },
  innerCon: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  val: {
    fontWeight: "bold",
    fontSize: 18,
    //color: "black",
    color: "#ffffff",
  },
  valname: {
    fontWeight: "900",
    fontSize: 12,
    //color: "black",
    color: "#ffffff",
  },
});

export default Defaulter_CollectionRow;
