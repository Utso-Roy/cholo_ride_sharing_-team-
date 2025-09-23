import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import Home from "../pages/Home/Home";
import RootLayout from "../Layout/RootLayout";
import SignUp from "../Access/SignUp";
import Login from "../Access/Login";
import ForgetPasswordwithEmail from "../Access/ForgetPasswordwithEmail";
import ForgetPasswordwithNumber from "../Access/ForgetPasswordwithNumber";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        path: "/",
      },
      {
        element: <SignUp></SignUp>,
        path: "/signup"
      },
      {
        element: <Login></Login>,
        path: "/login"
      },
      {
        element: <ForgetPasswordwithEmail></ForgetPasswordwithEmail>,
        path: "/forget-password-with-email"
      },
      {
        element: <ForgetPasswordwithNumber></ForgetPasswordwithNumber>,
        path: "/forget-password-with-number"
      },
    ],
  },
]);

export default router;