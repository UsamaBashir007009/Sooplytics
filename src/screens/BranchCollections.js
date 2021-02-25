import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    View,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet,
    Alert,
} from "react-native";
import { FlatList } from "react-native";
import BranchDefaulterRow from "../../Components/BranchDefaulterRow";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Defaulter_CollectionHeader from "../../Components/Defaulter_CollectionHeader";

const BranchCollections = ({ navigation }) => {

    const myid = navigation.getParam("myID");
    const bID = navigation.getParam("bID");
    const edate = navigation.getParam("edate");
    const sdate = navigation.getParam("sdate");
    const [startDate, setStartDate] = useState(sdate);
    const [endDate, setEndDate] = useState(edate);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
    const [items, setItems] = useState([]);
    const [Amount, setAmount] = useState(0);
    const [defauters, setDefaulters] = useState(0);
    const [loader, setLoader] = useState(false);
    const [noData, setNoData] = useState(true);

    const handleConfirm = (selectedDate) => {
        const currentDate = selectedDate;
        setDatePickerVisibility(Platform.OS === "ios");
        const x =
          currentDate.getFullYear() +
          "-" +
          (currentDate.getMonth() + 1) +
          "-" +
          currentDate.getDate();
    
        setStartDate(x);
        setDatePickerVisibility(false);
      };
      const handleConfirm2 = (selectedDate) => {
        const currentDate = selectedDate;
        setDatePickerVisibility2(Platform.OS === "ios");
        const x =
          currentDate.getFullYear() +
          "-" +
          (currentDate.getMonth() + 1) +
          "-" +
          currentDate.getDate();
    
        setEndDate(x);
        setDatePickerVisibility2(false);
      };
    async function getdata() {
        setLoader(true);
        await fetch(
            `https://soop.io/api/v1/school_owner/fees/collections/${myid}?branch_id=${bID}&date=${startDate}&to_date=${endDate}`,
            {
                method: "GET",
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status === 200) {
                    console.log(responseJson.data);
                    setAmount(responseJson.data.total_amount);
                    setDefaulters(responseJson.data.total_paid);
                    setItems(responseJson.data.students);
                    if (responseJson.data.students.length === 0) {
                        setNoData(true);
                    } else {
                        setNoData(false);
                    }
                } else {
                    Alert.alert(
                        "Simething went Wrong",
                        "Sorry something went wrong. Please check your network connection or try again later.",
                        [{ text: "OK, GOT IT", onPress: () => console.log("OK Pressed") }],
                        { cancelable: false }
                    );
                    console.log("error");
                }
                setLoader(false);
            });
    }
    useEffect(() => {
        getdata();
        console.log(items);
    }, []);

    return (
        <View style={{ height: "100%", backgroundColor: "#f6f6f6f6" }}>
            <Defaulter_CollectionHeader
                heading1="Amount Received"
                heading2="Total Paid"
                val2={defauters}
                val1={Amount}
            />
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.datePickBtn}
                    onPress={() => setDatePickerVisibility(true)}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={require("../../Images/calender.png")}
                            style={{
                                height: 15,
                                width: 15,
                                marginRight: 5,
                            }}
                        />
                        <Text style={{ color: "#2196F3", fontSize: 14 }}>{startDate}</Text>
                    </View>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                />
                <TouchableOpacity
                    style={styles.datePickBtn}
                    onPress={() => setDatePickerVisibility2(true)}
                >

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={require("../../Images/calender.png")}
                            style={{ height: 15, width: 15, marginRight: 5 }}
                        />
                        <Text style={{ color: "#2196F3", fontSize: 14 }}>{endDate}</Text>
                    </View>
                </TouchableOpacity>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible2}
                    mode="date"
                    onConfirm={handleConfirm2}
                    onCancel={() => setDatePickerVisibility2(false)}
                />
                <TouchableOpacity style={styles.fetchbtn} onPress={() => getdata()}>
                    <Image
                        source={require("../../Images/arrow1.png")}
                        style={{ width: 30, height: 30 }}
                    />
                </TouchableOpacity>
            </View>

            {loader && (
                <ActivityIndicator
                    size="large"
                    color="#000000"
                    style={{
                        height: "70%",
                    }}
                />
            )}
            {!loader && noData && (
                <>
                    <Image
                        source={require("../../Images/thanks.png")}
                        style={{
                            width: "80%",
                            height: "22%",
                            alignSelf: "center",
                            marginTop: "40%",
                        }}
                    />
                    <Text
                        style={{
                            alignSelf: "center",
                            textAlign: "center",
                            paddingHorizontal: "15%",
                            fontSize: 15,
                            color: "grey",
                            marginTop: 10,
                        }}
                    >
                        Oops! There are no results to show yet. We'll keep digging to find
                        them so please check back later.
          </Text>
                </>
            )}
            {!loader && (
                <FlatList
                    style={{ marginHorizontal: 5, marginVertical: 10, height: "78%", backgroundColor: "#f5f5f5" }}
                    keyExtractor={(item, index) => item.id + Math.random() + ""}
                    data={items}
                    renderItem={({ item }) => {
                        return (
                            <BranchDefaulterRow name={item.name} date={`${item.roll_number} | ${item.classroom}`} status={item.amount} />

                        );
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    datePickBtn: {
        height: 40,
        width: "32%",
        borderRadius: 5,
        backgroundColor: "#E3F2FD",
        paddingHorizontal: 5,
        paddingVertical: 7,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
        zIndex: 999,
      },
      fetchbtn: {
        height: 40,
        width: "15%",
        borderRadius: 5,
        backgroundColor: "#004EE0",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
      },
      container: {
        height: "10%",
        flexDirection:"row",
        marginLeft:"8%",
        marginRight:"8%",
        borderRadius:20,
        justifyContent:"space-evenly",
        backgroundColor:"#ffffff",
        alignItems:"center"
      },
    itemCon: {
        flexDirection: "column",
        borderRadius: 10,
        marginHorizontal: 7,
        marginVertical: 3,
        backgroundColor: "#f4f4f4",
    },
    block: {
        backgroundColor: "#ffffff",
        borderRadius: 14,
        marginVertical: 10,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "40%",
    },
    name: {
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: "11%",
        borderTopRightRadius: 13,
        borderTopLeftRadius: 13,
        paddingVertical: 3,
        color: "#000",
    },
    innerCon: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#ffffff",
        marginHorizontal: "8%",
        borderRadius: 25
    },
    val: {
        fontWeight: "bold",
        fontSize: 30,
        color: "black",
        // color: "#2196F3",
    },
    valname: {
        fontWeight: "900",
        fontSize: 12,
        color: "gray",
        //color: "#2196F3",
    },
});


export default BranchCollections
