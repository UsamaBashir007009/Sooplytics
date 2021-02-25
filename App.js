import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AdmissionsScreen from "./src/screens/AdmissionsScreen";
import BranchAdmissions from "./src/screens/BranchAdmissions";
import BranchCollections from "./src/screens/BranchCollections";
import BranchDefaulters from "./src/screens/BranchDefaulters";
import BranchStaffAttendance from "./src/screens/BranchStaffAttendance";
import BranchTeacherAttendance from "./src/screens/BranchTeacherAttendance";
import Collections from "./src/screens/Collections";
import DefaultersScreen from "./src/screens/DefaultersScreen";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import StaffAtendance from "./src/screens/StaffAtendance";
import TeacherAttendance from "./src/screens/TeacherAttendance";

const navigator = createStackNavigator(
  {
    LoginScreen: {
      screen: Login,
      navigationOptions: {
        headerShown: false,
      },
    },
    HomeScreen: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    TeacherAttendance: {
      screen: TeacherAttendance,
      navigationOptions: {
        title: "Teacher Attendance",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      },
    },
    StaffAttendance: {
      screen: StaffAtendance,
      navigationOptions: {
        title: "Staff Attendance",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      },
    },

    BranchTeacher: {
      screen: BranchTeacherAttendance,
      navigationOptions: {
        title: "Branch Teacher Attendance",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      },
    },
    BranchStaff: {
      screen: BranchStaffAttendance,
      navigationOptions: {
        title: "Branch Staff Attendance",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      },
    },
    DefaulerS: {
      screen: DefaultersScreen,
      navigationOptions: {
        title: "Defaulters",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      },
    },
    ColScreen: {
      screen: Collections,
      navigationOptions: {
        title: "Fee Collections",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      },
    },
    branchDefaulter:{
      screen: BranchDefaulters,
      navigationOptions: {
        title: "Branch Defaulters",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      },
    },
    branchCollection:{
      screen: BranchCollections,
      navigationOptions: {
        title: "Branch Collection",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      },
    },
    Admission:{
      screen: AdmissionsScreen,
      navigationOptions: {
        title: "Admissions",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      },
    },
    BAdmission:{
      screen: BranchAdmissions,
      navigationOptions: {
        title: "Admissions",
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      },
    }
  },
  {
    initialRouteName: "LoginScreen",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
