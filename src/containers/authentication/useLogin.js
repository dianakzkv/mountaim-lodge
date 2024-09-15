import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiLog";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: login, isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),

		onSuccess: userData => {
			// console.log("userData", userData);

			queryClient.setQueryData(["user"], userData.user);
			navigate("/dashboard", { replace: true });
		},
		onError: error => {
			console.log("Error", error);
			toast.error("Email or password are incorrect");
		},
	});

	// console.log("useLogIn login, isLoading : ", login, isLoading);

	return { login, isLoading };
}
