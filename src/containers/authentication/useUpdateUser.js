import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiLog";

export function useUpdateUser() {
	const queryClient = useQueryClient();

	const { mutate: updateUser, isLoading: isUpdating } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: ({ user }) => {
			toast.success("User account successfully updated");

			// queryClient.setQueryData("user", user);
			console.log(user);

			queryClient.invalidateQueries({
				queryKey: ["user"],
			});
		},
		// onError: err => toast.error(err.message),
	});

	return { isUpdating, updateUser };
}
