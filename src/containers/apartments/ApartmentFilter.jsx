import TableOperations from "../../components/TableOperations";
import Filter from "../../components/Filter";
import Sorting from "../../components/Sorting";

function ApartmentFilter() {
	return (
		<TableOperations>
			<Filter
				filterField="discount"
				options={[
					{ value: "all", label: "All" },
					{ value: "no-discount", label: "No discount" },
					{ value: "with-discount", label: "With discount" },
				]}
			/>

			<Sorting
				options={[
					{ value: "name-ascending", label: "Name A-Z" },
					{ value: "name-descending", label: "Name Z-A" },
					{
						value: "price-ascending",
						label: `Price (Low to High)`,
					},
					{
						value: "price-descending",
						label: `Price (High to Low) `,
					},
					{
						value: "capacity-ascending",
						label: `Capacity (Low to High) `,
					},
					{
						value: "capacity-descending",
						label: `Capacity (High to Low) `,
					},
				]}
			/>
		</TableOperations>
	);
}
export default ApartmentFilter;
