import { createBrowserRouter } from "react-router";
import Error from "../Error/Error";
import Home from "../pages/Home/Home";
import RootLayout from "../Layout/RootLayout";
import SignUp from "../Access/SignUp";

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
    ],
  },
]);

export default router;
