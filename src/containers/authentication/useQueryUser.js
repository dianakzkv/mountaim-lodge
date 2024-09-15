import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/apiLog";

export default function useQueryUser() {
	const {
		isLoading,
		data: userData,
		error,
	} = useQuery({
		queryKey: ["user"],
		queryFn: getUser,
	});

	return {
		isLoading,
		userData,
		isAuthenticated: userData?.role === "authenticated",
		error,
	};
}
