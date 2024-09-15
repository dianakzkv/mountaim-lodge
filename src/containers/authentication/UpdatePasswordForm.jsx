import { useForm } from "react-hook-form";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormRow from "../../components/FormRow";
import Input from "../../components/Input";

import { useUpdateUser } from "./useUpdateUser";
import styled from "styled-components";
import { useState } from "react";
import { HiOutlineEyeOff } from "react-icons/hi";
import { HiOutlineEye } from "react-icons/hi2";

const EyeIcon = styled.span`
	position: absolute;
	top: 50%;
	right: 12px;
	transform: translateY(-40%);
	cursor: pointer;
`;
const InputContainer = styled.div`
	position: relative;
	width: 100%;
`;
const FullWidthInput = styled(Input)`
	width: 100%;
	padding-right: 40px;
`;

function UpdatePasswordForm() {
	const { register, handleSubmit, formState, getValues, reset } = useForm();
	const { errors } = formState;

	const { updateUser, isUpdating } = useUpdateUser();

	function onSubmit({ password }) {
		updateUser({ password }, { onSuccess: () => reset() });
		setShowPassword(false);
		setShowConfirmPassword(false);
	}

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow
				label="New password (min 8 characters)"
				error={errors?.password?.message}
			>
				<InputContainer>
					<FullWidthInput
						type={showPassword ? "text" : "password"}
						id="password"
						autoComplete="current-password"
						onChange={e => e.target.value}
						disabled={isUpdating}
						{...register("password", {
							required: "This field is required",
							minLength: {
								value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
								message:
									"Password must contain min 8 characters (at least 1 letter and 1 number)",
							},
						})}
					/>
					<EyeIcon onClick={() => setShowPassword(prev => !prev)}>
						{showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
					</EyeIcon>
				</InputContainer>
			</FormRow>

			<FormRow
				label="Confirm password"
				error={errors?.passwordConfirm?.message}
			>
				<InputContainer>
					<FullWidthInput
						type={showConfirmPassword ? "text" : "password"}
						id="passwordConfirm"
						autoComplete="new-password"
						onChange={e => e.target.value}
						disabled={isUpdating}
						{...register("passwordConfirm", {
							required: "This field is required",
							validate: value =>
								getValues().password === value ||
								"Passwords need to match",
						})}
					/>
					<EyeIcon
						onClick={() => setShowConfirmPassword(prev => !prev)}
					>
						{showConfirmPassword ? (
							<HiOutlineEyeOff />
						) : (
							<HiOutlineEye />
						)}
					</EyeIcon>
				</InputContainer>
			</FormRow>
			<FormRow>
				<Button onClick={reset} type="reset" variation="secondary">
					Cancel
				</Button>
				<Button disabled={isUpdating} type="submit">
					Update password
				</Button>
			</FormRow>
		</Form>
	);
}

export default UpdatePasswordForm;
