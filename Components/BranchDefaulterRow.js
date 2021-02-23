import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

const BranchDefaulterRow = (props) => {
    return (
        <Pressable style={styles.rowContainer}>
            <Image
                style={{
                    width: 35,
                    height: 35,
                    alignSelf: "center",
                    borderRadius: 30,
                }}
                source={require("../Images/profile.jpg")}
            />
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
                            fontWeight:"bold"
                        }}
                    >
                        {props.name}
                    </Text>
                    <Text style={{ fontSize: 13, color: "gray" }}>{props.date}</Text>
                </View>
               
                    <Text
                        style={{
                            fontSize: 18,
                            paddingBottom: 2,
                            color: "#101112",
                            fontWeight:"bold"
                        }}
                    >
                        {props.status}
                    </Text>

            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
   
   
   
    rowContainer: {
        display: "flex",
        flexDirection: "row",
        marginHorizontal: "9%",
        marginTop: 10,
        marginBottom: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: "white",
        borderRadius: 10,
    },
    rowImage: {
        backgroundColor: "#CDDDF5",
        padding: 10,
        borderRadius: 20,
    },
});



export default BranchDefaulterRow
