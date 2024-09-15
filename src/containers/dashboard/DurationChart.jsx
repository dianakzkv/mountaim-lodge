import styled from "styled-components";
import Heading from "../../components/Heading";
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";

const ChartBox = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	padding: 2.4rem 3.2rem;
	grid-column: 3 / span 2;

	& > *:first-child {
		margin-bottom: 1.6rem;
	}

	& .recharts-pie-label-text {
		font-weight: 600;
	}
`;

const startData = [
	{
		duration: "1 night",
		value: 0,
		color: "#ef4444",
	},
	{
		duration: "2 nights",
		value: 0,
		color: "#f97316",
	},
	{
		duration: "3 nights",
		value: 0,
		color: "#eab308",
	},
	{
		duration: "4-5 nights",
		value: 0,
		color: "#84cc16",
	},
	{
		duration: "6-7 nights",
		value: 0,
		color: "#22c55e",
	},
	{
		duration: "8-15 nights",
		value: 0,
		color: "#3b82f6",
	},
	{
		duration: "15+ nights",
		value: 0,
		color: "#a855f7",
	},
];

function prepareData(startData, stays) {
	function incArrayValue(arr, field) {
		return arr.map(obj =>
			obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
		);
	}

	const data = stays
		.reduce((arr, cur) => {
			const num = cur.numberOfNights;
			if (num === 1) return incArrayValue(arr, "1 night");
			if (num === 2) return incArrayValue(arr, "2 nights");
			if (num === 3) return incArrayValue(arr, "3 nights");
			if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
			if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
			if (num >= 8 && num <= 15) return incArrayValue(arr, "8-15 nights");
			if (num >= 15) return incArrayValue(arr, "15+ nights");
			return arr;
		}, startData)
		.filter(obj => obj.value > 0);

	return data;
}

export default function DurationChart({ confirmedStays }) {
	const data = prepareData(startData, confirmedStays);

	console.log("data", data, "confirmedStays", confirmedStays);
	return (
		<ChartBox>
			<Heading as="h2">Stay duration summary</Heading>
			<ResponsiveContainer width="100%" height={250}>
				<PieChart>
					<Pie data={data} nameKey="duration" dataKey="value">
						{" "}
						{data.map(entry => (
							<Cell
								fill={entry.color}
								stroke={entry.color}
								key={entry.duration}
							></Cell>
						))}
					</Pie>
					<Tooltip />
					<Legend
						verticalAlign="middle"
						align="right"
						width="30%"
						layout="vertical"
						iconSize={15}
						iconType="circle"
					/>
				</PieChart>
			</ResponsiveContainer>
		</ChartBox>
	);
}
