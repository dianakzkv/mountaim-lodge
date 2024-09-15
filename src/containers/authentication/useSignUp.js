import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiLog";
import toast from "react-hot-toast";

export default function useSignUp() {
	const { mutate: signup, isLoading } = useMutation({
		mutationFn: signupApi,
		onSuccess: user => {
			console.log(user);
			toast.success(
				"New account created \n Please, check user's email and do verify of your account"
			);
		},
	});

	return { signup, isLoading };
}
