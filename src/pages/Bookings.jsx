import BookingTable from "../containers/bookings/BookingTable";
import BookingTableFilter from "../containers/bookings/BookingTableFilter";
import Heading from "../components/Heading";
import Row from "../components/Row";
import AddBooking from "../containers/bookings/AddBooking";

function Bookings() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Bookings</Heading>
				<BookingTableFilter />
			</Row>

			<Row>
				<AddBooking />
				<BookingTable />
			</Row>
		</>
	);
}

export default Bookings;
