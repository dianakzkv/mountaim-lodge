import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export default function useLastBookings() {
	const [searchParams] = useSearchParams();

	const numberOfDays = !searchParams.get("lastDays")
		? 7
		: Number(searchParams.get("lastDays"));

	const queryDate = subDays(new Date(), numberOfDays).toISOString();

	const { isLoading, data: bookings } = useQuery({
		queryFn: () => getBookingsAfterDate(queryDate),
		queryKey: ["bookings", `lastDays-${numberOfDays}`],
	});

	return { isLoading, bookings };
}
