import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="text-2xl bg-fuchsia-600">Hello World</div>,
  },
]);

export default router