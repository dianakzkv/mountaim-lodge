import {
	HiOutlineBanknotes,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from "react-icons/hi2";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import StatisticItem from "./StatisticItem";
import { formatCurrency } from "../../utils/helpers";

export default function Statistics({
	bookings,
	confirmedStays,
	numberOfDays,
	apartmentsCount,
}) {
	// 1.
	const numberOfBookings = bookings.length;
	// console.log("numberOfBookings", numberOfBookings);
	// const numerOfBookings = bookings.length || null;

	// 2.
	const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

	// // 3.
	const checkins = confirmedStays.length;
	// console.log("confirmedStays.length checkins", checkins);

	// 4.
	// console.log(
	// 	"numeberOfDays, apartmentsCount",
	// 	numberOfDays,
	// 	apartmentsCount
	// );
	const occupation =
		confirmedStays.reduce((acc, cur) => acc + cur.numberOfNights, 0) /
		(numberOfDays * apartmentsCount);
	// num checked in nights / all available nights (num days * num cabins)

	return (
		<>
			<StatisticItem
				title="Bookings"
				color="blue"
				icon={<HiOutlineCalendarDays />}
				value={numberOfBookings}
			/>
			<StatisticItem
				title="Sales"
				color="green"
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<StatisticItem
				title="Check ins"
				color="grey"
				icon={<HiOutlineClipboardCheck />}
				value={checkins}
			/>
			<StatisticItem
				title="Occupancy rate"
				color="yellow"
				icon={<HiOutlineChartBar />}
				value={Math.round(occupation * 100) + "%"}
			/>
		</>
	);
}
