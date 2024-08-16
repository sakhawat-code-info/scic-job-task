import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import ErrorPage from "../Pages/ErrorPage";
import App from "../App";
import LoginPage from "../Pages/LoginPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: (
					<PrivateRoute>
						<App />
					</PrivateRoute>
				),
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
		],
	},
]);
