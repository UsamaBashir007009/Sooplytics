import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import {
  ActivityIndicator,
  View,
  FlatList,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import AttendanceRow from "../../Components/AttendanceRow";
import TopAttendanceHeader from "../../Components/TopAttendanceHeader";

function BranchTeacherAttendance({ navigation }) {
  const myid = navigation.getParam("id");
  const myBid = navigation.getParam("bid");
  const date = navigation.getParam("date");
  
  const absent =navigation.getParam("absent");
  const present = navigation.getParam("present");
  const leave = navigation.getParam("leave");
  const [x, setx] = useState(date);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [items, setItems] = useState([]);
  const [loader, setLoader] = useState(false);
  const [noData, setNoData] = useState(false);

  async function getdata() {
    setLoader(true);
    setNoData(false);
    await fetch(
      `https://soop.io/api/v1/school_owner/teacher_attendances/${myid}?date=${x}&branch_id=${myBid}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 200) {
          console.log("responseJson.data.attendance");
          setItems(responseJson.data.attendance);
          if (responseJson.data.attendance.length === 0) {
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
    setx(date);
    getdata();
  }, []);
  //getdata();
  const handleConfirm = (selectedDate) => {
    const currentDate = selectedDate;
    setDatePickerVisibility(Platform.OS === "ios");
    const x =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate();

    setx(x);
    setItems([]);
    setDatePickerVisibility(false);
    getdata(x);
  };

  return (
    <View style={{ height: "100%", backgroundColor: "#f4f4f4f4" }}>
      <TopAttendanceHeader  absent={absent} leave={leave} present={present}/>
      <TouchableOpacity
        style={styles.datePickBtn}
        onPress={() => setDatePickerVisibility(true)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../Images/calender.png")}
            style={{ height: 22, marginTop: -5, width: 22, marginRight: 9 }}
          />
          <Text style={{ color: "#2196F3", fontSize: 17 }}>{x}</Text>
        </View>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />
      {loader && (
        <ActivityIndicator
          size="large"
          color="#000000"
          style={{
            height: "90%",
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
              marginTop: "50%",
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
      )}
      {!loader && (
        <FlatList
          style={{
            marginTop: 20,
            marginHorizontal: 5,
            paddingHorizontal: 3,
          }}
          keyExtractor={(item, index) => item.id + ""}
          data={items}
          renderItem={({ item }) => {
            return (
              <AttendanceRow name={item.name} status={item.status} date={x}  img={item.image} />
            );
          }}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  datePickBtn: {
    height: 40,
    width: "55%",
    marginTop: "-15%",
    borderRadius: 5,
    backgroundColor: "#E3F2FD",
    paddingHorizontal: 25,
    paddingVertical: 7,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    zIndex: 999,
  },
});

export default BranchTeacherAttendance;
