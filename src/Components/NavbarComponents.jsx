import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

const NavbarComponents = () => {
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
					<NavbarItem className="hidden lg:flex">
						<Link href="#">Login</Link>
					</NavbarItem>
					<NavbarItem>
						<Button
							as={Link}
							color="primary"
							href="#"
							variant="flat">
							Sign Up
						</Button>
					</NavbarItem>
				</NavbarContent>
			</Navbar>
		</div>
	);
};

export default NavbarComponents;
