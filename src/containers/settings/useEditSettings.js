import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useEditSettings() {
	const queryClient = useQueryClient();

	const { mutate: editSetting, isLoading: isEditing } = useMutation({
		mutationFn: updateSetting,
		onSuccess: () => {
			toast.success("Settings edited");
			queryClient.invalidateQueries({
				queryKey: ["settings"],
			});
		},
		onError: err => toast.error(err.message),
	});

	console.log("editSetting", editSetting, "isEditing", isEditing);

	return { editSetting, isEditing };
}
