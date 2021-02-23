import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
import Defaulter_CollectionRow from "../../Components/Defaulter_CollectionRow";
import CollectionHeader from "../../Components/CollectionHeader";

const Collections = ({ navigation }) => {
  const myid = navigation.getParam("id");
  const [startDate, setStartDate] = useState("Pick a Date");
  const [endDate, setEndDate] = useState("Pick a Date");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [items, setItems] = useState([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [amountReceived, setAmountR] = useState(0);
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
  async function getData() {
    if (startDate === "Pick a Date" || endDate == "Pick a Date") {
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
        `https://soop.io/api/v1/school_owner/fees/collections?id=${myid}&date=${startDate}&to_date=${endDate}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === 200) {
            setAmountR(responseJson.data.overall.amount_received);
            setTotalPaid(responseJson.data.overall.total_paid);
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

  return (
    <View style={{ height: "100%" }}>
      <CollectionHeader
        heading1="Amount Received"
        heading2="Total Paid"
        val2={totalPaid}
        val1={amountReceived}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.datePickBtn}
          onPress={() => setDatePickerVisibility(true)}
        >
          <Text style={{ color: "#fff", fontSize: 15, flex: 1 }}>
            Start Date
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../Images/calender.png")}
              style={{
                height: 22,
                marginTop: -5,
                width: 22,
                marginRight: 9,
              }}
            />
            <Text style={{ color: "#fff", fontSize: 15 }}>{startDate}</Text>
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
          <Text style={{ color: "#fff", fontSize: 15, flex: 1 }}>End Date</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../Images/calender.png")}
              style={{ height: 22, marginTop: -5, width: 22, marginRight: 9 }}
            />
            <Text style={{ color: "#fff", fontSize: 15 }}>{endDate}</Text>
          </View>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible2}
          mode="date"
          onConfirm={handleConfirm2}
          onCancel={() => setDatePickerVisibility2(false)}
        />
        <TouchableOpacity style={styles.fetchbtn} onPress={() => getData()}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Fetch Data</Text>
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
      {!loader && noData && (
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
      )}
      {!loader && (
        <FlatList
          style={{
            marginHorizontal: 5,
            marginVertical: 7,
            height: "51%",
            paddingHorizontal: 3,
            borderLeftColor: "grey",
            borderRightColor: "grey",
            borderLeftWidth: 0.8,
            borderRightWidth: 0.8,
          }}
          keyExtractor={(item, index) => item.id + ""}
          data={items}
          renderItem={({ item }) => {
            return (
              <Defaulter_CollectionRow
                amount={item.amount_received}
                name={item.name}
                defaulters={item.total_paid}
                head1="Amount Received"
                head2="Total Paid"
              />
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  datePickBtn: {
    height: "23%",
    width: "80%",
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: "#0a043c",
    paddingHorizontal: 25,
    paddingVertical: 7,
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  fetchbtn: {
    height: "23%",
    width: "60%",
    borderRadius: 5,
    backgroundColor: "#0a043c",
    paddingHorizontal: 25,
    paddingVertical: 7,
    marginTop: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#163b70",
    height: "23%",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
});

export default Collections;
