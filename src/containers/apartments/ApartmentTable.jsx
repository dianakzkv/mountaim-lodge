import Spinner from "../../components/Spinner";
import ApartmentItem from "./ApartmentItem";
import useQueryApartments from "./useQueryApartments";
import Table from "../../components/Table";
import { useSearchParams } from "react-router-dom";
import Empty from "../../components/Empty";

function ApartmentTable() {
	const { isLoading, apartments } = useQueryApartments();
	// console.log(isLoading, apartments, error);
	const [searchParams] = useSearchParams();
	if (isLoading) return <Spinner />;
	if (!apartments.length) return <Empty resource="Apartments" />;

	//filter
	const filterValue = searchParams.get("discount") || "all";
	let filteredApartments;
	if (filterValue === "all") filteredApartments = apartments;
	if (filterValue === "no-discount")
		filteredApartments = apartments.filter(
			apartment => apartment.discount === 0
		);
	if (filterValue === "with-discount")
		filteredApartments = apartments.filter(
			apartment => apartment.discount > 0
		);

	const sortBy = searchParams.get("sortBy") || "startDate-ascending";
	const [field, direction] = sortBy.split("-");
	const modifier = direction === "ascending" ? 1 : -1;

	const sortedApartments = filteredApartments.sort((a, b) => {
		if (typeof a[field] === "string" && typeof b[field] === "string") {
			return a[field].localeCompare(b[field]) * modifier;
		} else if (
			typeof a[field] === "number" &&
			typeof b[field] === "number"
		) {
			return (a[field] - b[field]) * modifier;
		} else {
			return 0; // Handle unexpected data types
		}
	});

	return (
		<Table columns="1fr 1.8fr 2.2fr 1fr 0.8fr 0.2fr">
			<Table.Header>
				{/* for photo */}
				<div></div>
				<div>Apartment</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				{/* for butttons edit, delete, copy */}
				<div></div>
			</Table.Header>

			<Table.Body
				data={sortedApartments}
				render={apartment => (
					<ApartmentItem apartment={apartment} key={apartment.id} />
				)}
			></Table.Body>
		</Table>
	);
}

export default ApartmentTable;
