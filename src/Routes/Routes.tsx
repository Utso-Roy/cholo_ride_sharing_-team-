import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home/Home";
import AboutUs from "../pages/OthersPage/AboutUs";
import OurStory from "../pages/OthersPage/OurStory";
import Career from "../pages/OthersPage/Career";
import Partnership from "../pages/OthersPage/PartherShip";
import Privacy from "../pages/OthersPage/Privacy";

// Help Pages
import FAQ from "../Utils/Help/FAQ/FAQ";
import CustomerCare from "../Utils/Help/CustomerCare/CustomerCare";
import UserGuide from "../Utils/Help/UserGuide/UserGuide";
import DriverGuide from "../Utils/Help/DriverGuide/DriverGuide";
import PrivacyPolicy from "../Utils/Help/PrivacyPolicy/PrivacyPolicy";
import FeedbackForm from "../Utils/Help/FeedbackForm/FeedbackForm";

// Blog Pages
import { BlogListPage } from "../pages/Blog_Page/BlogListPage";
import { BlogDetailsPage } from "../pages/Blog_Page/BlogDetailsPage";

// Earnings Pages
import BikeLayout from "../Layout/BikeLayout";
import BikeStepOne from "../pages/BikeStepOne";
import BikeStepTwo from "../pages/BikeStepTwo";
import CarLayout from "../Layout/CarLayout";
import CarStepOne from "../pages/CarStepOne";
import CarStepTwo from "../pages/CarStepTwo";
import CNGLayout from "../Layout/CNGLayout";
import CngStepOne from "../pages/CngStepOne";
import CngStepTwo from "../pages/CngStepTwo";
import CarEarnings from "../pages/CarEarnings";
import CngEarnings from "../pages/CngEarnings";
import SignUp from "../Access/SignUp";
import Login from "../Access/Login";
import ForgetPasswordwithEmail from "../Access/ForgetPasswordwithEmail";
import ForgetPasswordwithNumber from "../Access/ForgetPasswordwithNumber";

// Others
import SocialActivitiesPage from "../pages/OthersPage/SocialActivitiesPage";
import SocialActivitiesDetails from "../pages/OthersPage/SocialActivitiesDetails";

// Services Pages
import CNGRidePage from "../pages/Services/CNGRidePage";
import TrackRide from "../pages/Services/TrackRide";
import DashboardLayout from "../Layout/DashboardLayout";
import Profile from "../DashboardPages/Profile";
import BikeRide from "../pages/Services/BikeRide";
import CarRide from "../pages/Services/CarRide";
import Ambulance from "../pages/Services/Ambulance";
import JourneyPackage from "../pages/Services/JourneyPackage";
import SchoolBus from "../pages/Services/SchoolBus";
import ShuttleBus from "../pages/Services/ShuttleBus";
import Shipment from "../pages/Services/Shipment";
// import RideBooking from "../pages/Services/RideBooking";
import Drivers from "../DashboardPages/Drivers";
// import Users from "../DashboardPages/Users";
import ManagePartners from "../DashboardPages/ManagePartners";
import ManageJobsApplications from "../DashboardPages/ManageJobsApplications";

// Dashboard Pages
import ContentManagement from "../DashboardPages/ContentManagement";
import AddBlog from "../DashboardPages/AddBlog";

import Users from "../DashboardPages/Users";
import ReportsList from "../DashboardPages/Moderator/Reports/ReportsList";
import ReportDetailPage from "../DashboardPages/Moderator/Reports/ReportDetail";
import VerificationPage from "../DashboardPages/Moderator/Verification/VerificationPage";

import ManageSocialActivities from "../pages/OthersPage/ManageSocialActivities";
import Dashboard from "../DashboardPages/Dashboard";
import EditBlog from "../DashboardPages/EditBlog";
import RideBooking from "../pages/Services/RideBooking";
import LandingPage from "../pages/Landing/LandingPage";
import LearnMore from "../pages/LearnMore/LearnMore";
import UsersForModerator from "../DashboardPages/Moderator/Users/UsersForModerator";
import RideQueuePage from "../DashboardPages/Moderator/Rides/RideQueuePage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      // Home
      { index: true, element: <LandingPage></LandingPage>},

      // Help
      {
       path : '/home', element :<Home />
      },
      { path: "faq", element: <FAQ /> },
      { path: "customercare", element: <CustomerCare /> },
      { path: "userguide", element: <UserGuide /> },
      { path: "driverguide", element: <DriverGuide /> },
      { path: "privacypolicy", element: <PrivacyPolicy /> },
      { path: "feedbackform", element: <FeedbackForm /> },
      {
        path : 'learnMore' , element : <LearnMore></LearnMore>
      },

      // Blog
      { path: "blogs", element: <BlogListPage /> },
      { path: "blogs/:id", element: <BlogDetailsPage /> },

      // Services
      { path: "bike", element: <BikeRide /> },
      { path: "car", element: <CarRide /> },
      { path: "cng", element: <CNGRidePage /> },
      { path: "track", element: <TrackRide /> },
      { path: "ambulance", element: <Ambulance /> },
      { path: "journeypackage", element: <JourneyPackage /> },
      { path: "schoolbus", element: <SchoolBus /> },
      { path: "shuttlebus", element: <ShuttleBus /> },
      { path: "shipment", element: <Shipment /> },
      { path: "ridebooking", element: <RideBooking /> },

      // Others
      { path: "aboutus", element: <AboutUs /> },
      { path: "our-story", element: <OurStory /> },
      { path: "career", element: <Career /> },
      { path: "policy", element: <Privacy /> },
      { path: "partnership", element: <Partnership /> },
      { path: "social", element: <SocialActivitiesPage /> },
      { path: "activities/:id", element: <SocialActivitiesDetails /> },

      // Earnings / Nested Routes
      {
        path: "earn/bike",
        element: <BikeLayout />,
        children: [
          { index: true, element: <BikeStepOne /> },
          { path: "details", element: <BikeStepTwo /> },
        ],
      },
      {
        path: "earn/car",
        element: <CarLayout />,
        children: [
          { index: true, element: <CarStepOne /> },
          { path: "details", element: <CarStepTwo /> },
        ],
      },
      {
        path: "earn/cng",
        element: <CNGLayout />,
        children: [
          { index: true, element: <CngStepOne /> },
          { path: "details", element: <CngStepTwo /> },
        ],
      },

      // Earnings Summary
      { path: "earn/car/summary", element: <CarEarnings /> },
      { path: "earn/cng/summary", element: <CngEarnings /> },

      // Auth
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "forget-password-with-email", element: <ForgetPasswordwithEmail /> },
      { path: "forget-password-with-number", element: <ForgetPasswordwithNumber /> },
    ],
  },

  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <Profile></Profile> },
      { path: "manage-partners", element: <ManagePartners /> },
      { path: "manage-jobs", element: <ManageJobsApplications/> },
      { path: "manage-activities", element: <ManageSocialActivities/> },
      { path: "drivers", element: <Drivers /> },
      { path: "content-Management", element: <ContentManagement /> },
      { path: "content-Management/add-blog", element: <AddBlog /> },
      { path: "content-Management/edit/:id", element: <EditBlog /> },
      {
        path: "/dashboard/users", element: <Users></Users>
      },
      { path: "/dashboard/content-management", element: <ContentManagement /> },
      { path: "ContentManagement/add-blog", element: <AddBlog /> },
      {
        path :"/dashboard/users" , element : <Users/>
      },
      { path: 'mod/reports', element: <ReportsList/>},
      {
        path: 'mod/reports/:reportId',
        element: <ReportDetailPage/>
      },
      {
        path: 'mod/verifications',
        element: <VerificationPage/>
      },
      {
        path: 'mod/users',
        element: <UsersForModerator/>
      },
      {
        path: 'mod/rides/queue',
        element: <RideQueuePage/>
      }, 
    ],
  },


]);

export default router;
