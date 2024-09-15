import Heading from "../components/Heading";
import Row from "../components/Row";
import ApartmentTable from "../containers/apartments/ApartmentTable";
import AddApartment from "../containers/apartments/AddApartment";
import ApartmentFilter from "../containers/apartments/ApartmentFilter";

function Apartments() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Apartments</Heading>
				<ApartmentFilter />
			</Row>

			<Row>
				<AddApartment />
				<ApartmentTable />
			</Row>
		</>
	);
}

export default Apartments;
