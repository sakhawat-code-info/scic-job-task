import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import UseAuth from "../AuthProvider/UseAuth";

const PrivateRoute = ({ children }) => {
	const { user, loader } = UseAuth();
	const destination = useLocation();

	if (loader) {
		return (
			<>
				<div className="flex items-center justify-center">
					<span className="loading loading-spinner loading-lg"></span>
				</div>
			</>
		);
	}

	if (user) {
		return children;
	}

	return (
		<Navigate
			to={"/login"}
			state={destination?.pathname ? destination.pathname : "/"}></Navigate>
	);
};

PrivateRoute.propTypes = {
	children: PropTypes.node,
};
export default PrivateRoute;
