import Heading from "../components/Heading";
import Row from "../components/Row";
import DashboardFilter from "../containers/dashboard/DashboardFilter";
import DashboardLayout from "../containers/dashboard/DashboardLayout";

export default function Dashboard() {
	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Dashboard</Heading>
				<DashboardFilter />
			</Row>
			<DashboardLayout />
		</>
	);
}
