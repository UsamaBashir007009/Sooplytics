import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, FlatList,Pressable, TouchableOpacity, Image, Alert } from 'react-native'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import AdmissionHeader from '../../Components/AdmissionHeader'
import BranchAdmissionRow from '../../Components/BranchAdmissionRow';

const BranchAdmissions = ({navigation}) => {
    const myid = navigation.getParam("myID");
    const bID = navigation.getParam("bID");
    const edate = navigation.getParam("edate");
    const sdate = navigation.getParam("sdate");
    const [startDate, setStartDate] = useState(sdate);
    const [endDate, setEndDate] = useState(edate);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
    const [items, setItems] = useState([]);
    
    const [total, setTotal] = useState(0);
    const [admitted, setAdmitted] = useState(0);
    const [pending, setPending] = useState(0);
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
        if (startDate === "Start Date" || endDate == "End Date") {
          Alert.alert(
            "Invalid Dates",
            "You have selected Invalid Dates. Please select dates Correctly first and then try again later. ",
            [{ text: "OK, got it", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        } else {
          setLoader(true);
          setNoData(false);
          await fetch(
            `https://soop.io/api/v1/school_owner/admissions/${myid}?branch_id=${bID}&date=${startDate}&to_date=${endDate}`,
            {
              method: "GET",
            }
          )
            .then((response) => response.json())
            .then((responseJson) => {
              if (responseJson.status === 200) {
                  console.log(responseJson);
                  setAdmitted(responseJson.data.admitted);
                  setPending(responseJson.data.pending);
                  setTotal(responseJson.data.total);
                setItems(responseJson.data.inquiries);
                if (responseJson.data.inquiries.length === 0) {
                  setNoData(true);
                } else {
                  setNoData(false);
                }
              } else {
                Alert.alert(
                  "Simething went Wrong",
                  "Sorry something went wrong. Please check your network connection or try again later.",
                  [
                    {
                      text: "OK, GOT IT",
                      onPress: () => console.log("OK Pressed"),
                    },
                  ],
                  { cancelable: false }
                );
                console.log("error");
              }
              setLoader(false);
            });
        }
    
        setLoader(false);
      }
    
      useEffect(() => {
        getdata();
    }, []);
    return (
        <View style={styles.container}>
        <AdmissionHeader val1={total} val2={admitted} val3={pending}/>
        <View style={styles.innercontainer}>
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
        height: "53%",
      }}
    />
  )}
  {/* {!loader && noData && (
    <>
      <Image
        source={require("../../Images/thanks.png")}
        style={{
          width: "80%",
          height: "22%",
          alignSelf: "center",
          marginTop: "20%",
          opacity: 0.85,
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
  )} */}
  {!loader && (
    <FlatList
    style={{ marginHorizontal: 5, marginVertical: 10, height: "78%",backgroundColor:"#f5f5f5" }}
      keyExtractor={(item, index) => item.id + ""}
      data={items}
      renderItem={({ item }) => {
        return (
            <BranchAdmissionRow name={item.name} status={item.status} date={item.phone} />
        );
      }}
    />
  )}
</View>
);
};
const styles = StyleSheet.create({
container: {
    flex: 2,
    height: "100%",
    backgroundColor: "#f4f4f4",
},
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
    elevation: 2,
  },
  fetchbtn: {
    height: 40,
    width: "15%",
    borderRadius: 5,
    backgroundColor: "#004EE0",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    
    elevation: 2,
  },
  innercontainer: {
    height: "10%",
    flexDirection:"row",
    marginLeft:"8%",
    marginRight:"8%",
    borderRadius:20,
    justifyContent:"space-evenly",
    backgroundColor:"#ffffff",
    alignItems:"center"
  },
  name: {
    fontWeight: "bold",
    fontSize: 25,
    marginLeft:"11%",
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
    paddingVertical: 3,
    color: "#000",
  },
  itemCon: {
    flexDirection: "column",
    borderRadius: 10,
    marginHorizontal: 7,
    marginVertical: 3,
    backgroundColor: "#f4f4f4",
  },
  innerCon: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor:"#ffffff",
    marginHorizontal:"7%",
    borderRadius:25
  },
  block: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    marginVertical: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
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
  
})


export default BranchAdmissions
