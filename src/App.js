import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLogin from "./pages/user/UserLogin";
import UserSignUp from "./pages/user/UserSignUp";
import ErrorPage from "./pages/shared/ErrorPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminMain from "./pages/admin/AdminMain";
import RequireAdminAuth from "./pages/shared/RequireAdminAuth";
import AdminLayout from "./components/AdminLayout";
import UsersList from "./pages/admin/UsersList";
import SplashPage from "./pages/user/SplashPage";
import UserTeams from "./pages/user/UserTeams";
import RequireAuth from "./pages/shared/RequireAuth";
import Layout from "./components/Layout";
import { WEBLINKS } from "./store/constants/WebLinks";
import UserCurrentTeam from "./pages/user/UserCurrentTeam";

const router = createBrowserRouter([
  {
    path: WEBLINKS.HOME,
    element: <SplashPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: WEBLINKS.LOGIN,
    element: <UserLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: WEBLINKS.SIGNUP,
    element: <UserSignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: WEBLINKS.MAIN,
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: WEBLINKS.MAIN,
        element: <UserTeams />,
      },
      {
        path: `${WEBLINKS.TEAMS}/:teamId`,
        element: <UserCurrentTeam />,
      },
    ],
    errorElement: <ErrorPage />,
  },

  // Links for ADMIN ----------------------------------------
  {
    path: WEBLINKS.ADMIN_LOGIN,
    element: <AdminLogin />,
    errorElement: <ErrorPage />,
  },
  {
    path: WEBLINKS.ADMIN_MAIN,
    element: (
      <RequireAdminAuth>
        <AdminLayout />
      </RequireAdminAuth>
    ),
    children: [
      {
        path: WEBLINKS.ADMIN_MAIN,
        element: <AdminMain />,
      },
      {
        path: WEBLINKS.ADMIN_ACCOUNT,
        element: <AdminMain />,
      },
      {
        path: WEBLINKS.ADMIN_ALL_USERS,
        element: <UsersList />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
