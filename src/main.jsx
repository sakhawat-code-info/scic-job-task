import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";
import { router } from "./Routes/AllRoutes";
import AuthProvider from "./AuthProvider/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<NextUIProvider>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</NextUIProvider>
	</React.StrictMode>
);
