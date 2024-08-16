import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const UseAuth = () => {
	const authData = useContext(AuthContext);

	return authData;
};

export default UseAuth;
