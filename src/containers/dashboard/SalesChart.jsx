import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../components/Heading";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import {
	eachDayOfInterval,
	format,
	formatDate,
	isSameDay,
	subDays,
} from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;
`;
const StyledDate = styled.span`
	color: var(--color-emerald-700);
	/* text-decoration: underline; */

	margin: 0 0.5rem;
`;

export default function SalesChart({ bookings, numberOfDays }) {
	const allDates = eachDayOfInterval({
		start: subDays(new Date(), numberOfDays - 1),
		end: new Date(),
	});
	// console.log(allDates);

	const data = allDates.map(date => {
		return {
			label: format(date, "dd MMM"),
			totalSales: bookings
				.filter(booking =>
					isSameDay(date, new Date(booking.created_at))
				)
				.reduce((acc, cur) => acc + cur.totalPrice, 0),
			extrasSales: bookings
				.filter(booking =>
					isSameDay(date, new Date(booking.created_at))
				)
				.reduce((acc, cur) => acc + cur.extrasPrice, 0),
		};
	});
	console.log(data);

	const colors = {
		totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
		extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
	};

	return (
		<StyledSalesChart>
			<Heading as="h2">
				Sales from{" "}
				<StyledDate>
					{formatDate(allDates.at(0), "dd MMM yyyy")}
				</StyledDate>{" "}
				to{" "}
				<StyledDate>
					{formatDate(allDates.at(-1), "dd MMM yyyy")}
				</StyledDate>
			</Heading>

			<ResponsiveContainer height={300} width="100%">
				<AreaChart data={data}>
					<XAxis dataKey="label" />
					<YAxis unit=" ₴ " />
					<CartesianGrid />
					<Tooltip />
					<Area
						dataKey="totalSales"
						type="monotone"
						stroke={colors.totalSales.stroke}
						fill={colors.totalSales.fill}
						strokeWidth={1.4}
						name="Total sales"
						unit=" ₴"
					/>
					<Area
						dataKey="extrasSales"
						type="monotone"
						stroke={colors.extrasSales.stroke}
						fill={colors.extrasSales.fill}
						strokeWidth={1.4}
						name="Extras sales"
						unit=" ₴"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}
