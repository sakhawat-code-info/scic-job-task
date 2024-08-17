import { Pagination, Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import SingleProduct from "../Components/SingleProduct";

const AllProducts = () => {
	const [loading, setLoading] = useState(true);
	const [searchInput, setSearchInput] = useState("");
	const [allData, setAllData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [list, setList] = useState([]);
	const [value, setValue] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;

	// Fetch data
	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const res = await fetch("https://scic-last-task-server.vercel.app/myAllProducts");
				const json = await res.json();
				setAllData(json);
				setFilteredData(json);
				setList(json.slice(0, itemsPerPage));
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
		setCurrentPage(1);
	};

	// Search function
	const searchRowData = () => {
		const lowercasedInput = searchInput.toLowerCase();
		const filterData = allData.filter((item) => item.productName.toLowerCase().includes(lowercasedInput) || item.category.toLowerCase().includes(lowercasedInput));
		setFilteredData(filterData);
	};

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
		let sortedData = [...filteredData];
		if (sortType === "lowToHigh") {
			sortedData.sort((a, b) => a.price - b.price);
		} else if (sortType === "highToLow") {
			sortedData.sort((a, b) => b.price - a.price);
		} else if (sortType === "newest") {
			sortedData.sort((a, b) => new Date(b.date) - new Date(a.date));
		}
		setFilteredData(sortedData);
	};

	const filterOptions = [
		{ key: "lowToHigh", label: "Low to High" },
		{ key: "highToLow", label: "High to Low" },
		{ key: "newest", label: "Newest" },
	];

	// Update list when currentPage or filteredData changes
	useEffect(() => {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		setList(filteredData.slice(start, end));
	}, [currentPage, filteredData]);

	// Filter states
	// const [brandFilter, setBrandFilter] = useState("");
	// const [categoryFilter, setCategoryFilter] = useState("");
	// const [priceRangeFilter, setPriceRangeFilter] = useState([0, 1000]);

	// const applyFilters = () => {
	// 	let filteredData = allData;

	// 	if (brandFilter) {
	// 		filteredData = filteredData.filter((item) => item.brandName.toLowerCase() === brandFilter.toLowerCase());
	// 	}

	// 	if (categoryFilter) {
	// 		filteredData = filteredData.filter((item) => item.category.toLowerCase() === categoryFilter.toLowerCase());
	// 	}

	// 	if (priceRangeFilter.length === 2) {
	// 		const [minPrice, maxPrice] = priceRangeFilter;
	// 		filteredData = filteredData.filter((item) => item.price >= minPrice && item.price <= maxPrice);
	// 	}

	// 	setFilteredData(filteredData);
	// 	setCurrentPage(1); // Reset to the first page after filtering
	// };

	// useEffect(() => {
	// 	applyFilters();
	// }, [brandFilter, categoryFilter, priceRangeFilter, allData]);

	// console.log(brandFilter);

	return (
		<div>
			{/* search + sorting  */}
			<div className="flex justify-between items-center my-9">
				{/* for Search  */}
				<div className="w-1/2 my-1">
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
						placeholder="Search by product name"
						startContent={<CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />}
						value={searchInput}
						onChange={handleSearchInput}
						onClear={() => clearSearch()}
					/>
				</div>

				{/* for Sorting  */}
				<div className="flex w-1/6 flex-col gap-2">
					<Select
						variant="bordered"
						placeholder="Sorting"
						selectedKeys={[value]}
						className="max-w-xs"
						onChange={handleSelectionChange}>
						{filterOptions.map((filter) => (
							<SelectItem key={filter.key}>{filter.label}</SelectItem>
						))}
					</Select>
				</div>
			</div>

			{/* filter */}
			<div className="flex gap-2 my-7">
				<Select
					placeholder="Select Brand"
					onChange={(e) => setBrandFilter(e.target.value)}>
					<SelectItem value="DANVOUY">DANVOUY</SelectItem>
					<SelectItem value="Opna">Opna</SelectItem>
					<SelectItem value="MBJ">MBJ</SelectItem>
					<SelectItem value="Generic">Generic</SelectItem>
					<SelectItem value="Lock and Love">Lock and Love</SelectItem>
					<SelectItem value="BIYLACLESEN">BIYLACLESEN</SelectItem>
					<SelectItem value="Samsung">Samsung</SelectItem>
					<SelectItem value="Acer">Acer</SelectItem>
					<SelectItem value="WD">WD</SelectItem>
					<SelectItem value="Silicon Power">Silicon Power</SelectItem>
				</Select>

				<Select
					placeholder="Select Category"
					onChange={(e) => setCategoryFilter(e.target.value)}>
					<SelectItem value="women's clothing">Women's clothing </SelectItem>
					<SelectItem value="men's clothing">Men's clothing</SelectItem>
					<SelectItem value="electronics">Electronics</SelectItem>
					<SelectItem value="jewelery">Jewelery</SelectItem>
				</Select>

				<Input
					type="range"
					min="0"
					max="1000"
					// value={priceRangeFilter[1]}
					// onChange={(e) => setPriceRangeFilter([0, e.target.value])}
					label="Price Range"
				/>
			</div>

			{/* for card looping  */}
			<div className="font-[sans-serif] bg-gray-100">
				<div className="p-4 mx-auto lg:max-w-7xl sm:max-w-full">
					<h2 className="text-4xl font-extrabold text-gray-800 mb-12">All Premium Products</h2>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  max-xl:gap-4 gap-6">
						{/* single items */}
						{!loading &&
							list.map((item, index) => (
								<SingleProduct
									key={index}
									item={item}
								/>
							))}
					</div>
				</div>
			</div>

			{/* pagination  */}

			<div className="flex flex-col gap-5 items-end justify-end my-5">
				<Pagination
					total={Math.ceil(filteredData.length / itemsPerPage)}
					color="secondary"
					page={currentPage}
					onChange={(page) => setCurrentPage(page)}
				/>
				<div className="flex gap-2">
					<Button
						size="sm"
						variant="flat"
						color="secondary"
						onPress={() => {
							if (currentPage > 1) {
								setCurrentPage((prev) => prev - 1);
							}
						}}>
						Previous
					</Button>
					<Button
						size="sm"
						variant="flat"
						color="secondary"
						onPress={() => {
							if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
								setCurrentPage((prev) => prev + 1);
							}
						}}>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AllProducts;
