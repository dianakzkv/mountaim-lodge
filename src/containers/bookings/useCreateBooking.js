import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBookingApi } from "../../services/apiBookings";

export default function useCreateBooking() {
	const queryClient = useQueryClient();

	const { mutate: createBooking, isLoading: isCreating } = useMutation({
		mutationFn: createBookingApi,
		onSuccess: () => {
			toast.success("New booking created");
			queryClient.invalidateQueries({
				queryKey: ["booking"],
			});
		},
		onError: err => toast.error(err.message),
	});

	return { isCreating, createBooking };
}
