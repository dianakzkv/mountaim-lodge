import EditSettingsForm from "../containers/settings/EditSettingsForm";
import Heading from "../components/Heading";
import Row from "../components/Row";

export default function Settings() {
	return (
		<Row>
			<Heading as="h1">Update hotel settings</Heading>
			<EditSettingsForm />
		</Row>
	);
}
