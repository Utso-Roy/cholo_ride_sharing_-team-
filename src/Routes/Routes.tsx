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

// Auth
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
import RideBooking from "../pages/Services/RideBooking";
import Drivers from "../DashboardPages/Drivers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      // Home
      { index: true, element: <Home /> },

      // Help
      { path: "faq", element: <FAQ /> },
      { path: "customercare", element: <CustomerCare /> },
      { path: "userguide", element: <UserGuide /> },
      { path: "driverguide", element: <DriverGuide /> },
      { path: "privacypolicy", element: <PrivacyPolicy /> },
      { path: "feedbackform", element: <FeedbackForm /> },

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

  // Dashboard Routes
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Profile /> }, // default page
      { path: "profile", element: <Profile /> },
      { path: "drivers", element: <Drivers/>}
    ],
  },
]);

export default router;
