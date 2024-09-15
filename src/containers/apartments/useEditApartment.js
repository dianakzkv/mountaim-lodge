import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditApartment } from "../../services/apiApartments";

export function useEditApartment() {
	const queryClient = useQueryClient();

	const { mutate: editApartment, isLoading: isEditing } = useMutation({
		mutationFn: ({ newApartmentData, id }) =>
			createEditApartment(newApartmentData, id),
		onSuccess: () => {
			toast.success("Apartment edited");
			queryClient.invalidateQueries({
				queryKey: ["apartments"],
			});
		},
		onError: err => toast.error(err.message),
	});

	return { isEditing, editApartment };
}
