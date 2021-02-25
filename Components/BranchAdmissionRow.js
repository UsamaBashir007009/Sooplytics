import React from 'react'
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

const BranchAdmissionRow = (props) => {
  return (
    <Pressable style={styles.rowContainer}>
     
     
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
            {props.name}
          </Text>
          <Text style={{ fontSize: 13, color: "gray" }}>{props.date}</Text>
        </View>
        {/* //absent */}
        
        {
          props.status == "Pending" && <View
            style={{
              marginRight: 5,
              paddingHorizontal: 12,
              paddingVertical: 5,
              backgroundColor: "#FFEBEE",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#F44336",
              }}
            >
              {props.status}
            </Text>
          </View>
        }
        {/* Present */}
        {
          props.status == "Admitted" && <View
            style={{
              marginRight: 5,
              paddingHorizontal: 12,
              paddingVertical: 5,
              backgroundColor: "#ECFFED",
              borderRadius: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "green",
              }}
            >
              {props.status}
            </Text>
          </View>
        }
                      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: "row",
    height: 50,
    marginVertical: 1,
    elevation: 0.3,
    backgroundColor: "#fbf6f0",
    borderTopWidth: 0.5,
    borderTopColor: "grey",
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
    alignItems: "center",
  },
  attendanceName: {
    fontSize: 17,
    padding: 4,
    fontWeight: "bold",
  },
  attendanceStatus: {
    fontSize: 17,
    flex: 1,
    padding: 4,
    marginRight: 4,
    textAlign: "right",
    fontWeight: "bold",
  },
  rowContainer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: "8%",
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


export default BranchAdmissionRow
