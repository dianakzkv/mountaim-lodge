import styled from "styled-components";
import useLastBookings from "./useLastBookings";
import useLastStays from "./useLastStays";
import Spinner from "../../components/Spinner";
import Statistics from "./Statistics";
import useQueryApartments from "../apartments/useQueryApartments";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto auto 35rem;
	gap: 2.4rem;
`;

export default function DashboardLayout() {
	const { bookings, isLoading: isLoadingBookings } = useLastBookings();

	const {
		confirmedStays,
		isLoading: isLoadingStays,
		numberOfDays,
	} = useLastStays();

	const { apartments, isLoading: isLoadingApartments } = useQueryApartments();

	if (isLoadingBookings || isLoadingStays || isLoadingApartments)
		return <Spinner />;

	console.log(
		"confirmedStays",

		confirmedStays
	);

	return (
		<StyledDashboardLayout>
			<SalesChart bookings={bookings} numberOfDays={numberOfDays} />
			<Statistics
				bookings={bookings}
				confirmedStays={confirmedStays}
				numberOfDays={numberOfDays}
				apartmentsCount={apartments.length}
			></Statistics>
			<TodayActivity />
			<DurationChart confirmedStays={confirmedStays} />
		</StyledDashboardLayout>
	);
}
