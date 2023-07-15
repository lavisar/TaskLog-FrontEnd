import "./App.css";
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
import { WEBLINKS } from "./store/constants/WebLinks";
import UserCurrentTeam from "./pages/user/UserCurrentTeam";
import UserProfile from "./pages/user/UserProfile";
import Layout1 from "./components/Layout1";
import TaskBoard from "./pages/task/TaskBoard";
import AdminProfile from "./pages/admin/AdminProfile";
import ManageAccount from "./pages/admin/ManageAccount";
import TeamList from "./pages/admin/TeamsList";
import TeamDetails from "./pages/admin/TeamDetails";
import AdminCreate from "./pages/admin/AdminCreate";
import UserCurrentProject from "./pages/user/UserCurrentProject";
import MyTasks from "./pages/task/MyTasks";
import UserProjects from "./pages/user/UserProjects";
import Document from "./pages/document/Document";

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
				<UserTeams />
			</RequireAuth>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: `/:teamId${WEBLINKS.PROJECTS}`,
		element: (
			<RequireAuth>
				<UserProjects />
			</RequireAuth>
		),
		errorElement: <ErrorPage />,
	},
	{
		path: WEBLINKS.MAIN,
		element: (
			<RequireAuth>
				<Layout1 />
			</RequireAuth>
		),
		children: [
			// {
			//   path: WEBLINKS.MAIN,
			//   element: <UserTeams />,
			// },
			{
				path: WEBLINKS.PROFILE,
				element: <UserProfile />,
			},
			{
				path: `${WEBLINKS.TEAMS}/:teamId`,
				element: <UserCurrentTeam />,
			},
			{
				path: `${WEBLINKS.PROJECT}/:teamId`,
				element: <UserCurrentProject />,
			},
			{
				path: WEBLINKS.TASK,
				element: <TaskBoard />,
			},
			{
				path: `${WEBLINKS.TASK}/:userId`,
				element: <MyTasks />,
			},
			{
				path: `${WEBLINKS.DOCUMENT}/:projectId`,
				element: <Document />,
			},
		],
		errorElement: <ErrorPage />,
	},

	// ============================================================
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
				path: WEBLINKS.ADMIN_PROFILE,
				element: <AdminProfile />,
			},
			{
				path: WEBLINKS.ADMIN_CREATE,
				element: <AdminCreate />,
			},
			{
				path: WEBLINKS.ADMIN_ALL_USERS,
				element: <UsersList />,
			},
			{
				path: `${WEBLINKS.ADMIN_MANAGE_ACCOUNT}/:accountId`,
				element: <ManageAccount />,
			},

			// team
			{
				path: WEBLINKS.ADMIN_ALL_TEAMS,
				element: <TeamList />,
			},
			{
				path: `${WEBLINKS.ADMIN_TEAM_DETAIL}/:teamId`,
				element: <TeamDetails />,
			},
		],
		errorElement: <ErrorPage />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
