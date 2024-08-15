import React from "react";
import { Pagination, Button } from "@nextui-org/react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

const AllProducts = () => {
	const [loading, setLoading] = useState(true);
	const [searchInput, setSearchInput] = useState("");
	const [allData, setAllData] = useState([]);
	const [list, setList] = useState([]);
	const [value, setValue] = useState("");
	const [currentPage, setCurrentPage] = React.useState(1);

	// Fetch data
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await fetch("https://fakestoreapi.com/products");
				const json = await res.json();
				setList(json);
				setAllData(json);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	// Handle search input
	const handleSearchInput = (event) => {
		setSearchInput(event.target.value);
	};

	// Clear search input
	const clearSearch = () => {
		setSearchInput("");
		setList(allData);
	};

	// Search function
	const searchRowData = () => {
		const lowercasedInput = searchInput.toLowerCase();
		const filterData = allData.filter((item) => item.title.toLowerCase().includes(lowercasedInput) || item.category.toLowerCase().includes(lowercasedInput));
		setList(filterData);
	};

	// Trigger search when searchInput changes
	useEffect(() => {
		searchRowData();
	}, [searchInput]);

	// Handle selection change
	const handleSelectionChange = (e) => {
		const selectedValue = e.target.value;
		setValue(selectedValue);
		sortData(selectedValue);
	};

	// Sort data based on selection
	const sortData = (sortType) => {
		let sortedData = [...allData];

		if (sortType === "lowToHigh") {
			sortedData.sort((a, b) => a.price - b.price);
		} else if (sortType === "highToLow") {
			sortedData.sort((a, b) => b.price - a.price);
		} else if (sortType === "newest") {
			sortedData.sort((a, b) => new Date(b.date) - new Date(a.date)); // Assuming there's a date field
		}

		setList(sortedData);
	};
	const filterOptions = [
		{ key: "lowToHigh", label: "Low to High" },
		{ key: "highToLow", label: "High to Low" },
		{ key: "newest", label: "Newest" },
	];

	return (
		<div>
			<div className="flex justify-between items-center my-9">
				{/* for Search  */}
				<div className="w-1/2 my-8">
					<Input
						isClearable
						radius="lg"
						classNames={{
							label: "text-black/50 dark:text-white/90",
							input: ["bg-transparent", "text-black/90 dark:text-white/90", "placeholder:text-default-700/50 dark:placeholder:text-white/60"],
							innerWrapper: "bg-transparent",
							inputWrapper: [
								"shadow-xl",
								"bg-default-200/50",
								"dark:bg-default/60",
								"backdrop-blur-xl",
								"backdrop-saturate-200",
								"hover:bg-default-200/70",
								"dark:hover:bg-default/70",
								"group-data-[focus=true]:bg-default-200/50",
								"dark:group-data-[focus=true]:bg-default/60",
								"!cursor-text",
							],
						}}
						placeholder="Search users by product name"
						startContent={<CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
						value={searchInput} // Bind the input value to searchInput state
						onChange={handleSearchInput} // Handle input change
						onClear={() => clearSearch()}
					/>
				</div>

				{/* for filter  */}
				<div className="flex w-1/6 flex-col gap-2">
					<Select
						// label="Favorite Animal"
						variant="bordered"
						placeholder="Filter option"
						selectedKeys={[value]}
						className="max-w-xs"
						onChange={handleSelectionChange}>
						{filterOptions.map((filter) => (
							<SelectItem key={filter.key}>{filter.label}</SelectItem>
						))}
					</Select>
				</div>
			</div>

			{/* for card looping  */}
			<div className="gap-4 grid grid-cols-2 md:grid-cols-3 ">
				{!loading &&
					list.map((item, index) => (
						<Card
							shadow="sm"
							key={index}
							isPressable
							onPress={() => console.log("item pressed")}>
							<CardBody className="overflow-visible p-0">
								<Image
									shadow="sm"
									radius="lg"
									width="100%"
									alt={item.title}
									className="w-full object-cover h-[240px]"
									src={item.image}
								/>
							</CardBody>
							<CardFooter className="text-small justify-between">
								<b>{item.title}</b>
								<p className="text-default-500">{item.price}</p>
							</CardFooter>
						</Card>
					))}
			</div>

			{/* pagination  */}

			<div className="flex flex-col gap-5 items-end justify-end my-5">
				{/* <p className="text-small text-default-500">Selected Page: {currentPage}</p> */}
				<Pagination
					total={10}
					color="secondary"
					page={currentPage}
					onChange={setCurrentPage}
				/>
				<div className="flex gap-2">
					<Button
						size="sm"
						variant="flat"
						color="secondary"
						onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}>
						Previous
					</Button>
					<Button
						size="sm"
						variant="flat"
						color="secondary"
						onPress={() => setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AllProducts;
