import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteApartment as deleteApartmentApi } from "../../services/apiApartments";
import toast from "react-hot-toast";

export function useDeleteApartment() {
	const queryClient = useQueryClient();

	const { isLoading: isDeleting, mutate: deleteApartment } = useMutation({
		// mutationFn: id => deleteApartment(id),
		mutationFn: deleteApartmentApi,
		onSuccess: () => {
			toast.success("Apartment successfully deleted");
			queryClient.invalidateQueries({
				queryKey: ["apartments"],
			});
		},
		onError: err => toast.error(err.message),
	});

	return { isDeleting, deleteApartment };
}
