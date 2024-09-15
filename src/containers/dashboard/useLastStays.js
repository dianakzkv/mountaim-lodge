import { subDays } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export default function useLastSatys() {
	const [searchParams] = useSearchParams();

	const numberOfDays = !searchParams.get("lastDays")
		? 7
		: Number(searchParams.get("lastDays"));

	const queryDate = subDays(new Date(), numberOfDays).toISOString();

	const {
		isLoading,
		data: stays,
		error,
	} = useQuery({
		queryFn: () => getStaysAfterDate(queryDate),
		queryKey: ["stays", `lastDays-${numberOfDays}`],
	});

	if (error) {
		console.error("Error fetching stays:", error);
		return { isLoading, stays: [], confirmedStays: [], numberOfDays };
	}
	// console.log("Fetched stays:", stays);

	const confirmedStays = stays?.filter(
		stay => stay.status === "checked-in" || stay.status === "checked-out"
	);
	// console.log("confirmedStays.:", confirmedStays, confirmedStays.length);

	return { isLoading, stays, confirmedStays, numberOfDays };
}
