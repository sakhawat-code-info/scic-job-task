import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import UseAuth from "../AuthProvider/UseAuth";

const NavbarComponents = () => {
	const { user, loggingOut } = UseAuth();

	const handleSignOut = () => {
		loggingOut()
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
				console.log(error);
			});
	};
	return (
		<div>
			<Navbar shouldHideOnScroll>
				<NavbarBrand>
					{/* <AcmeLogo /> */}
					<p className="font-bold text-inherit">ACME</p>
				</NavbarBrand>
				<NavbarContent
					className="hidden sm:flex gap-4"
					justify="center">
					<NavbarItem>
						<Link
							color="foreground"
							href="">
							All Products
						</Link>
					</NavbarItem>
					<NavbarItem isActive>
						<Link
							href="#"
							aria-current="page">
							Customers
						</Link>
					</NavbarItem>
				</NavbarContent>
				<NavbarContent justify="end">
					{user ? (
						<>
							<NavbarItem>
								<Button
									as={Link}
									color="primary"
									onClick={handleSignOut}
									href="#"
									variant="flat">
									Sign Out
								</Button>
							</NavbarItem>
						</>
					) : (
						<>
							<NavbarItem className="hidden lg:flex">
								<Link href={"/login"}>Login</Link>
							</NavbarItem>
						</>
					)}
				</NavbarContent>
			</Navbar>
		</div>
	);
};

export default NavbarComponents;
