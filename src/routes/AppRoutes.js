import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "../store/auth-context";
import toast from "react-hot-toast";
import backendUrl from "../backendUrl";

// Pages
import About from "../pages/About/About";
import Classes from "../pages/Classes/Classes";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import RequestForCertificate from "../pages/RequestForCertifcate/RequestForCertificate";
import Schooling from "../pages/Schooling/Schooling";
import RTE from "../pages/RTE/RTE";
import RequestReceived from "../pages/RequestReceived/RequestReceived";
import AddRteData from "../pages/AddRteData/AddRteData";
import RteData from "../pages/RteData/RteData";
import Volunteers from "../pages/Volunteers/Volunteers";
import Udgam from "../pages/Udgam/Udgam";
import SocialService from "../pages/SocialService/SocialService";
import Utsarg from "../pages/Utsarg/Utsarg";
import Utsaah from "../pages/Utsaah/Utsaah";
import Unnayan from "../pages/Unnayan/Unnayan";
import Ummeed from "../pages/Ummeed/Ummeed";
import EduVisit from "../pages/EduVisit/EduVisit";
import BloodDonation from "../pages/BloodDonation/BloodDonation";
import Governing from "../pages/Organization/Governing/Governing";
import Founder from "../pages/Organization/Founder/Founder";
import LegacyPresidents from "../pages/Organization/Legacy/PastPresidents/LegacyPresidents";
import LegacyVicePresidents from "../pages/Organization/Legacy/VicePresidents/LegacyVicePresidents";
import Executive from "../pages/Organization/Executive/Executive";
import Advisory from "../pages/Organization/Advisory/Advisory";
import Constitution from "../pages/Constitution/Constitution";
import CreatePost from "../pages/CreatePost/CreatePost";
import EditPost from "../pages/EditPost/EditPost";
import ListPost from "../pages/ListPosts/ListPosts";
import Post from "../pages/Post/Post";
import AddVolunteerData from "../pages/AddVolunteerData/AddVolunteerData";
import Events from "../pages/Events/Events";
import CreateUser from "../pages/CreateUser/CreateUser";
import ListUsers from "../pages/ListUsers/ListUsers";
import VerifyCode from "../pages/VerifyCode/VerifyCode";
import Muskan from "../pages/Muskan/Muskan";
import GE from "../pages/GE/GE";
import Article from "../pages/Article/Article";
import AddEventVolunteersData from "../pages/AddEventVolunteersData/AddEventVolunteersData";
import EventVolunteersData from "../pages/EventVolunteersData/EventVolunteersData";
import UtsavAyojan from "../pages/UtsavAyojan/UtsaavAyojan";
import DonationForm from "../pages/Forms/DonationForm";
import BecomeSponsor from "../pages/Forms/BecomeSponsor";
import HealthCareForm from "../pages/Forms/HealthCareForm";
import VolunteersData from "../pages/VolunteersData/VolunteersData";
import EventVolunteers from "../pages/EventVolunteers/EventVolunteers";
import PastActivities from "../pages/PastActivities/PastActivities";

// Layout
import Layout from "../components/Layout";

const Stack = createStackNavigator();

const AppRoutes = () => {
  const authCtx = useContext(AuthContext);
  const userType = authCtx.userType;

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const userId = localStorage.getItem("userId");
      (async () => {
        await fetch(`${backendUrl}/getUserType/${userId}`)
          .then((res) => res.json())
          .then((resData) => {
            authCtx.fillUserType(resData.userType);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })();
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Public Routes */}
        <Stack.Screen name="LandingPage" component={LandingPage} />
        {!authCtx.isLoggedIn && <Stack.Screen name="Login" component={Login} />}
        {!authCtx.isLoggedIn && <Stack.Screen name="VerifyCode" component={VerifyCode} />}
        
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="DonationForm" component={DonationForm} />
        <Stack.Screen name="BecomeSponsor" component={BecomeSponsor} />
        <Stack.Screen name="HealthCareForm" component={HealthCareForm} />
        <Stack.Screen name="Classes" component={Classes} />
        <Stack.Screen name="Governing" component={Governing} />
        <Stack.Screen name="Advisory" component={Advisory} />
        <Stack.Screen name="Founder" component={Founder} />
        <Stack.Screen name="Executive" component={Executive} />
        <Stack.Screen name="Presidents" component={LegacyPresidents} />
        <Stack.Screen name="VicePresidents" component={LegacyVicePresidents} />
        <Stack.Screen name="Udgam" component={Udgam} />
        <Stack.Screen name="SocialService" component={SocialService} />
        <Stack.Screen name="Utsarg" component={Utsarg} />
        <Stack.Screen name="Utsaah" component={Utsaah} />
        <Stack.Screen name="Unnayan" component={Unnayan} />
        <Stack.Screen name="Ummeed" component={Ummeed} />
        <Stack.Screen name="Utsav" component={UtsavAyojan} />
        <Stack.Screen name="EduVisit" component={EduVisit} />
        <Stack.Screen name="BloodDonation" component={BloodDonation} />
        <Stack.Screen name="Muskan" component={Muskan} />
        <Stack.Screen name="GE" component={GE} />
        <Stack.Screen name="Schooling" component={Schooling} />
        <Stack.Screen name="RTE" component={RTE} />
        <Stack.Screen name="Volunteers" component={Volunteers} />
        <Stack.Screen name="EventVolunteers" component={EventVolunteers} />
        <Stack.Screen name="RecentActivities" component={Events} />
        <Stack.Screen name="PastActivities" component={PastActivities} />
        <Stack.Screen name="Article" component={Article} />
        <Stack.Screen name="Constitution" component={Constitution} />
        <Stack.Screen name="RequestForCertificate" component={RequestForCertificate} />
        <Stack.Screen name="RteData" component={RteData} />
        <Stack.Screen name="RteData" component={RteData} />
        
        {/* Protected Routes */}
        {authCtx.isLoggedIn && (userType === "master" || userType === "media") && (
          <>
            <Stack.Screen name="AddRteData" component={AddRteData} />
            <Stack.Screen name="CreatePost" component={CreatePost} />
            <Stack.Screen name="AddVolunteerData" component={AddVolunteerData} />
            <Stack.Screen name="AddEventVolunteersData" component={AddEventVolunteersData} />
          </>
        )}

        {authCtx.isLoggedIn && (userType === "master" || userType === "media" || userType === "teachers") && (
          <>
            <Stack.Screen name="EditPost" component={EditPost} />
            <Stack.Screen name="ListPost" component={ListPost} />
          </>
        )}

        {authCtx.isLoggedIn && (userType === "master" || userType === "teachers") && (
          <Stack.Screen name="RequestReceived" component={RequestReceived} />
        )}

        {authCtx.isLoggedIn && userType === "master" && (
          <>
            <Stack.Screen name="CreateUser" component={CreateUser} />
            <Stack.Screen name="ListUsers" component={ListUsers} />
          </>
        )}

        {/* Fallback */}
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
