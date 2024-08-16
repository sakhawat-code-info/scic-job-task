import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

import UseAuth from "../AuthProvider/UseAuth";

const RegisterPage = () => {
	const navigate = useNavigate();
	const { createUser, updateProfileByNameAndPhotoURL, setUser } = UseAuth();

	const handleRegisterForm = (event) => {
		event.preventDefault();
		const form = event.target;

		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;
		const photoURL = form.photoURL.value;

		// password checking
		if (password.length < 6) {
			toast.error("Minimum 6 digits required");
			return;
		} else if (!/[A-Z]/.test(password)) {
			toast.error("Use Uppercase");
			return;
		} else if (!/[a-z]/.test(password)) {
			toast("Use Lowercase");
			return;
		}

		// register data taking
		createUser(email, password)
			.then((userCredential) => {
				const userInfo = userCredential.user;
				// console.log(userInfo)
				updateProfileByNameAndPhotoURL(name, photoURL)
					.then(() => {})
					.catch((error) => {
						toast.error(error);
					});

				setUser(userInfo);
				Swal.fire({
					// position: "top-end",
					icon: "success",
					title: "Registration Successful. Please Login",
					showConfirmButton: false,
					timer: 1500,
				});
				navigate("/login");
			})
			.catch((error) => {
				toast.error(error.message);
				// ..
			});
	};

	return (
		<div className="py-16">
			<div className="flex rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
				<div className="w-full p-8 lg:w-1/2 mx-auto">
					<p className="text-xl text-gray-600 text-center capitalize">Please registration first!</p>

					<form onSubmit={handleRegisterForm}>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">Full Name</label>
							<input
								className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
								type="text"
								name="name"
								required
							/>
						</div>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
							<input
								className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
								type="email"
								name="email"
								required
							/>
						</div>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
							<input
								className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
								type="password"
								name="password"
								required
							/>
						</div>
						<div className="mt-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">Photo URL</label>
							<input
								className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
								type="text"
								name="photoURL"
								required
							/>
						</div>

						<div className="mt-8">
							<button
								type="submit"
								className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
								Registration
							</button>
						</div>
					</form>

					<div className="mt-4 flex items-center justify-between">
						<span className="border-b w-1/5 md:w-1/4"></span>
						<Link
							to={"/login"}
							className="text-xs text-gray-500 uppercase">
							or
							<span className="link link-primary font-extrabold"> Login</span>{" "}
						</Link>
						<span className="border-b w-1/5 md:w-1/4"></span>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
};

export default RegisterPage;
