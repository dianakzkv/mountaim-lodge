import { useQuery } from "@tanstack/react-query";
import getApartments from "../../services/apiApartments";

export default function useQueryApartments() {
	const {
		isLoading,
		data: apartments,
		error,
	} = useQuery({
		queryKey: ["apartments"],
		queryFn: getApartments,
	});

	return { isLoading, error, apartments };
}
