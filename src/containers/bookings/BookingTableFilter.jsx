import Sorting from "../../components/Sorting";
import Filter from "../../components/Filter";
import TableOperations from "../../components/TableOperations";

function BookingTableFilter() {
	return (
		<TableOperations>
			<Filter
				filterField="status"
				options={[
					{ value: "all", label: "All" },
					{ value: "checked-out", label: "Checked out" },
					{ value: "checked-in", label: "Checked in" },
					{ value: "unconfirmed", label: "Unconfirmed" },
				]}
			/>

			<Sorting
				options={[
					{
						value: "startDate-descending",
						label: "Newest",
					},
					{
						value: "startDate-ascending",
						label: "Oldest",
					},
					{
						value: "totalPrice-descending",
						label: "Highest price",
					},
					{
						value: "totalPrice-ascending",
						label: "Lowest price",
					},
				]}
			/>
		</TableOperations>
	);
}

export default BookingTableFilter;
