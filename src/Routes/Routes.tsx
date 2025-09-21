import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home/Home";

// Others Pages
import AboutUs from "../pages/OthersPage/AboutUs";
import OurStory from "../pages/OthersPage/OurStory";

// Help Pages
import FAQ from "../Utils/Help/FAQ/FAQ";
import CustomerCare from "../Utils/Help/CustomerCare/CustomerCare";
import UserGuide from "../Utils/Help/UserGuide/UserGuide";
import DriverGuide from "../Utils/Help/DriverGuide/DriverGuide";

// Blog Pages
import { BlogListPage } from "../pages/Blog_Page/BlogListPage";
import { BlogDetailsPage } from "../pages/Blog_Page/BlogDetailsPage";

// Earnings Pages
import BikeEarnings from "../pages/BikeEarnings";
import CarEarnings from "../pages/CarEarnings";
import CngEarnings from "../pages/CngEarnings";
import BikeLayout from "../Layout/BikeLayout";
import BikeStepOne from "../pages/BikeStepOne";
import BikeStepTwo from "../pages/BikeStepTwo";

// Auth
import SignUp from "../Access/SignUp";
import Login from "../Access/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> }, // default home page

      // Help Pages
      { path: "/faq", element: <FAQ /> },
      { path: "/customercare", element: <CustomerCare /> },
      { path: "/userguide", element: <UserGuide /> },
      { path: "/driverguide", element: <DriverGuide /> },

      // Blog Pages
      { path: "/blogs", element: <BlogListPage /> },
      { path: "/blogs/:id", element: <BlogDetailsPage /> },

      // Others Pages
      { path: "/aboutUs", element: <AboutUs /> },
      { path: "/our-story", element: <OurStory /> },

      // Earnings / Nested Routes
      {
        path: "/earn/bike",
        element: <BikeLayout />,
        children: [
          { index: true, element: <BikeStepOne /> },
          { path: "details", element: <BikeStepTwo /> },
        ],
      },
      { path: "/earn/car", element: <CarEarnings /> },
      { path: "/earn/cng", element: <CngEarnings /> },

      // Auth Pages
      { path: "/signup", element: <SignUp /> },
      { path: "/login", element: <Login /> },
    ],
  },
]);

export default router;
