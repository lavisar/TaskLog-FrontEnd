import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserSignUp from "./pages/user/UserSignUp";
import ErrorPage from "./pages/shared/ErrorPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminMain from "./pages/admin/AdminMain";
import RequireAdminAuth from "./pages/shared/RequireAdminAuth";
import AdminLayout from "./components/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <UserSignUp />,
    errorElement: <ErrorPage />,
  },

  // Links for ADMIN
  {
    path: "/admin/login",
    element: <AdminLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/admin",
    element: (
      <RequireAdminAuth>
        <AdminLayout />
      </RequireAdminAuth>
    ),
    children: [
      {
        path: "/admin",
        element: <AdminMain />,
      },
      {
        path: "/admin/account",
        element: <AdminMain />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
