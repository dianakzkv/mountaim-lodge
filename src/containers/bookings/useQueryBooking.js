import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export default function useQueryBooking() {
	const { bookingId } = useParams();
	console.log("bookingId: ", bookingId, typeof bookingId);

	const {
		data: booking,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["bookings", bookingId],
		queryFn: () => getBooking(bookingId),
		retry: false,
	});

	console.log("booking: ", booking);

	return { isLoading, error, booking };
}
