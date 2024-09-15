import styled from "styled-components";
import LoginForm from "../containers/authentication/LoginForm";
import Heading from "../components/Heading";
import Logo from "../components/Logo";

const LoginLayout = styled.main`
	min-height: 100vh;
	display: grid;
	grid-template-columns: 44rem;
	align-content: center;
	justify-content: center;
	gap: 3rem;
	background-color: var(--color-grey-100);
`;

export default function Login() {
	return (
		<LoginLayout>
			<Logo />
			<Heading as="h4">Log in</Heading>
			<LoginForm />
		</LoginLayout>
	);
}
