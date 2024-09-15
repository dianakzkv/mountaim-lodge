import styled from "styled-components";

import { useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import FormRowVertical from "../../components/FormRowVertical";
import { useLogin } from "./useLogin";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const EyeIcon = styled.span`
	position: absolute;
	top: 50%;
	right: 10px;
	transform: translateY(-50%);
	cursor: pointer;
`;
const InputContainer = styled.div`
	position: relative;
	width: 100%;
`;

export default function LoginForm() {
	const { login, isLoading } = useLogin();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();
		if (!email || !password) {
			return;
		}
		login(
			{ email, password },
			{
				onSettled: () => {
					setEmail("");
					setPassword("");
				},
			}
		);
	}

	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<FormRowVertical label="Email address">
				<Input
					type="email"
					id="email"
					// This makes this form better for password managers
					autoComplete="username"
					value={email}
					onChange={e => setEmail(e.target.value)}
					disabled={isLoading}
				/>
			</FormRowVertical>

			<FormRowVertical label="Password">
				<InputContainer>
					<Input
						id="password"
						type={showPassword ? "text" : "password"}
						autoComplete="current-password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						disabled={isLoading}
						style={{ width: "100%" }}
					/>
					<EyeIcon>
						{showPassword ? (
							<HiOutlineEyeOff
								onClick={handleTogglePasswordVisibility}
							/>
						) : (
							<HiOutlineEye
								onClick={handleTogglePasswordVisibility}
							/>
						)}
					</EyeIcon>
				</InputContainer>
			</FormRowVertical>

			<FormRowVertical>
				<Button size="large" disabled={isLoading}>
					Login
				</Button>
			</FormRowVertical>
		</Form>
	);
}
