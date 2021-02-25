import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { FlatList } from "react-native";
import TopAttendanceHeader from "../../Components/TopAttendanceHeader";

const StaffAtendance = ({ navigation }) => {
  const myid = navigation.getParam("id");
  const [items, setItems] = React.useState([]);
  const [x, setx] = useState("Pick a Date");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [overAllpercentage, setoverAllPercentage] = useState("0");
  const [loader, setLoader] = useState(false);
  const [noData, setNoData] = useState(true);

  async function getdata(x) {
    setLoader(true);
    setNoData(false);
    await fetch(
      `https://soop.io/api/v1/school_owner/staff_attendances?id=${myid}&date=${x}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 200) {
          setoverAllPercentage(responseJson.data.overall_data);
          setItems(responseJson.data.branches);
          if (responseJson.data.branches.length === 0) {
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
    setDatePickerVisibility(false);
    getdata(x);
  };

  return (
    <View style={styles.container}>
      <TopAttendanceHeader absent={overAllpercentage.total_absent} present={overAllpercentage.total_present} leave={overAllpercentage.total_on_leave} />
     

      <TouchableOpacity
        style={styles.datePickBtn}
        onPress={() => setDatePickerVisibility(true)}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../Images/calender.png")}
            style={{ height: 22, marginTop: -5, width: 22, marginRight: 9 }}
          />
         <Text style={{ color: "#2196F3", fontSize: 16 }}>{x}</Text>
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
            height: "68%",
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
     <FlatList
        style={{
          height: "68%",
          marginTop: 35,
          marginBottom: 5,
        }}
        keyExtractor={(item, index) => item.id + ""}
        data={items}
        renderItem={({ item }) => {
          return (
            <Pressable
              style={styles.rowContainer}
              onPress={() =>
                navigation.navigate("BranchStaff", {
                  id: myid,
                  bid: item.id,
                  date: x,
                  absent:overAllpercentage.total_absent,
                  present:overAllpercentage.total_present,
                  leave:overAllpercentage.total_on_leave
                })
              }
            >
              <View style={styles.rowImage}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 9,
                  }}
                  source={require("../../Images/collection.png")}
                />
              </View>
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
                    {item.name}
                  </Text>
                  <Text
                    style={{ fontSize: 13, color: "gray" }}
                  >{`${item.present} out of ${item.total_staff} present`}</Text>
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#101112",
                  }}
                >
                  {`${item.percentage}%`}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    height: "100%",
    backgroundColor: "#fff",
  },
  TextPercentage: {
    fontWeight: "800",
    fontSize: 33,
    color: "#000",
  },

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

  rowContainer: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
  },
  rowImage: {
    backgroundColor: "#CDDDF5",
    padding: 10,
    borderRadius: 20,
  },
});

export default StaffAtendance;
