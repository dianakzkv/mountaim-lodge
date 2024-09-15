import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useQueryBookings() {
	const [searchParams] = useSearchParams();

	//filter
	const filteredValue = searchParams.get("status");
	const filter =
		!filteredValue || filteredValue === "all"
			? null
			: { field: "status", value: filteredValue };

	//sorting
	const sortBy = searchParams.get("sortBy") || "startDate-descending";
	const [field, direction] = sortBy.split("-");
	const sorting = { field, direction };

	const {
		isLoading,
		data: bookings,
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sorting],
		queryFn: () => getBookings({ filter, sorting }),
	});

	return { isLoading, error, bookings };
}
