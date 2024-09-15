import Heading from "../components/Heading";
import SignupForm from "../containers/authentication/SignupForm";

export default function NewUsers() {
	return (
		<>
			<Heading as="h1">Add user</Heading>
			<SignupForm />
		</>
	);
}
