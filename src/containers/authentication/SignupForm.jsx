import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormRow from "../../components/FormRow";
import Input from "../../components/Input";
import useSignUp from "./useSignUp";
import Spinner from "../../components/Spinner";

export default function SignupForm() {
	const { signup, isLoading } = useSignUp();
	const { register, formState, getValues, handleSubmit, reset, clearErrors } =
		useForm();
	const { errors } = formState;

	function handleOnSubmit({ name, email, password }) {
		signup(
			{ name, email, password },
			{
				onSettled: () => reset(),
			}
		);
	}

	function handleCancel() {
		clearErrors(); // Clears all errors
		reset(); // Resets the form
	}

	if (isLoading) <Spinner />;

	return (
		<Form onSubmit={handleSubmit(handleOnSubmit)}>
			<FormRow label="Full name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isLoading}
					{...register("name", {
						required: "This field is required",
						pattern: {
							value: /^[A-Z][a-zA-Z]*\s[A-Z][a-zA-Z]*$/,
							message:
								"Enter the user's first name and last name with a capital letter",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					type="email"
					id="email"
					disabled={isLoading}
					{...register("email", {
						required: "This field is required",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Invalid email",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Password (min 8 characters)"
				error={errors?.password?.message}
			>
				<Input
					type="password"
					id="password"
					disabled={isLoading}
					{...register("password", {
						required: "This field is required",
						pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
							message:
								"Password must contain min 8 characters (at least 1 letter and 1 number)",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Repeat password"
				error={errors?.passwordConfirm?.message}
			>
				<Input
					type="password"
					id="passwordConfirm"
					disabled={isLoading}
					{...register("passwordConfirm", {
						required: "This field is required",
						validate: value =>
							value === getValues().password ||
							"Both password fields should match",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="button"
					onClick={handleCancel}
				>
					Cancel
				</Button>
				<Button>Create new user</Button>
			</FormRow>
		</Form>
	);
}
