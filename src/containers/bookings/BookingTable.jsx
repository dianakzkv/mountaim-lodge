import BookingItem from "./BookingItem";
import Table from "../../components/Table";
import Empty from "../../components/Empty";
import Spinner from "../../components/Spinner";
import { useQueryBookings } from "./useQueryBookings";

function BookingTable() {
	const { bookings, isLoading } = useQueryBookings();

	if (isLoading) return <Spinner />;

	if (!bookings.length) return <Empty resource="Bookings" />;

	return (
		<>
			<Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
				<Table.Header>
					<div>Cabin</div>
					<div>Guest</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={bookings}
					render={booking => (
						<BookingItem key={booking.id} booking={booking} />
					)}
				/>
			</Table>
		</>
	);
}

export default BookingTable;
