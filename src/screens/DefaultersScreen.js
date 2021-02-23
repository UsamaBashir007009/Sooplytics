import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import { FlatList } from "react-native";
import Defaulter_CollectionHeader from "../../Components/Defaulter_CollectionHeader";
import Defaulter_CollectionRow from "../../Components/Defaulter_CollectionRow";

const DefaultersScreen = ({ navigation }) => {
  const myid = navigation.getParam("id");
  const [items, setItems] = useState([]);
  const [Amount, setAmount] = useState(0);
  const [defauters, setDefaulters] = useState(0);
  const [loader, setLoader] = useState(false);
  const [noData, setNoData] = useState(true);
  async function getdata() {
    setLoader(true);
    await fetch(
      `https://soop.io/api/v1/school_owner/fees/defaulters?id=${myid}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 200) {
          setAmount(responseJson.data.overall.total_amount);
          setDefaulters(responseJson.data.overall.total_defaulters);
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
  useEffect(() => {
    getdata();
    console.log(items);
  }, []);

  return (
    <View style={{ height: "100%", backgroundColor:"#f6f6f6f6" }}>
      <Defaulter_CollectionHeader
        heading2="Total Defaulters"
        heading1="Total Amount"
        val2={defauters}
        val1={Amount}
      />
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
          style={{ marginHorizontal: 5, marginVertical: 10, height: "78%",backgroundColor:"#f5f5f5" }}
          keyExtractor={(item, index) => item.id + ""}
          data={items}
          renderItem={({ item }) => {
            return (

              <Pressable style={styles.itemCon} onPress={()=>{
                navigation.navigate("branchDefaulter",{
                  myID:myid,
                  bID:item.id
                })
              }}>
                 <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.innerCon}>
                    <View style={styles.block}>
                      <Text style={styles.val}>{item.total_amount}</Text>
                      <Text style={styles.valname}>Total Amount</Text>
                    </View>

                    <View style={styles.block}>
                      <Text style={styles.val}>{item.total_defaulters}</Text>
                      <Text style={styles.valname}>Total Defaulters</Text>
                    </View>
                    <View style={{ flexDirection:"column", justifyContent:"center"}}>
                    <Image
                    source={require("../../Images/arrow.png")}
                    style={{width:15, height:15}}
                    />
                    </View>
                  </View>
              </Pressable>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  datePickBtn: {
    height: 35,
    width: "60%",
    flexDirection: "row",
    borderRadius: 5,
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
    height: 40,
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
    backgroundColor: "#153e90",
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
    marginLeft:"11%",
    borderTopRightRadius: 13,
    borderTopLeftRadius: 13,
    paddingVertical: 3,
    color: "#000",
  },
  innerCon: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor:"#ffffff",
    marginHorizontal:"8%",
    borderRadius:25
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

export default DefaultersScreen;
