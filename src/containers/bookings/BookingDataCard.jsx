import styled from "styled-components";
import { format, isToday } from "date-fns";
import { HiOutlineHome, HiOutlineBanknotes } from "react-icons/hi2";

import { HiOutlineQuestionMarkCircle, HiOutlineChat } from "react-icons/hi";

import DataItem from "../../components/DataItem";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

const StyledBookingDataBox = styled.section`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-200);
	border-radius: var(--border-radius-md);

	overflow: hidden;
`;

const Header = styled.header`
	border-bottom: 1px solid var(--color-grey-200);
	padding: 1.6rem 3rem;
	color: var(--color-grey-600);
	font-size: 1.6rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: space-between;

	svg {
		height: 3rem;
		width: 3rem;
	}

	& div:first-child {
		display: flex;
		align-items: center;
		gap: 1.6rem;
		font-weight: 600;
		font-size: 1.6rem;
	}

	& span {
		font-size: 1.8rem;
		margin-left: 4px;
	}
`;

const Section = styled.section`
	padding: 3rem 3.6rem 1rem;
`;

const Guest = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	margin-bottom: 1.4rem;
	color: var(--color-grey-600);

	& p:first-of-type {
		font-size: large;
		font-weight: 600;
		color: var(--color-grey-800);
	}
`;

const Price = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 2.4rem;
	border-radius: var(--border-radius-sm);
	margin-top: 2.2rem;

	background-color: ${props =>
		props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
	color: ${props =>
		props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

	& p:last-child {
		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 600;
	}

	svg {
		height: 2.2rem;
		width: 2.2rem;
		color: currentColor !important;
	}
`;

const Footer = styled.footer`
	padding: 1.2rem 4rem;
	font-size: 1.4rem;
	color: var(--color-grey-500);
	text-align: left;
`;

function BookingDataCard({ booking }) {
	const {
		created_at,
		startDate,
		endDate,
		numberOfNights,
		numberOfGuests,
		apartmentPrice,
		extrasPrice,
		totalPrice,
		breakfastInculded,
		additionalInfo,
		isPaid,
		guests: { name, email, nationality, idGuest },
		apartments: { name: apartmentName },
	} = booking;

	return (
		<StyledBookingDataBox>
			<Header>
				<div>
					<HiOutlineHome />
					<p>
						{numberOfNights} nights in apartment
						<span>
							<u>&apos;{apartmentName}&apos;</u>
						</span>
					</p>
				</div>

				<p>
					{format(new Date(startDate), "dd MMM yyyy, EEE")} (
					{isToday(new Date(startDate))
						? "Today"
						: formatDistanceFromNow(startDate)}
					) &mdash; {format(new Date(endDate), "dd MMM yyyy, EEE")}
				</p>
			</Header>

			<Section>
				<Guest>
					<p>
						{name}
						{numberOfGuests > 1
							? ` + ${numberOfGuests - 1} guest(s)`
							: ""}
					</p>
					<span>|</span>
					<p>{email}</p>
					<span>|</span>
					<p>ID: {idGuest}</p>
					<span>|</span>
					<p>{nationality}</p>
				</Guest>

				{additionalInfo && (
					<DataItem icon={<HiOutlineChat />} label="Comments:">
						{additionalInfo}
					</DataItem>
				)}

				<DataItem
					icon={<HiOutlineQuestionMarkCircle />}
					label="Breakfast included:"
				>
					{breakfastInculded ? "Yes" : "No"}
				</DataItem>

				<Price isPaid={isPaid}>
					<DataItem
						icon={<HiOutlineBanknotes />}
						label={`Total price:`}
					>
						{formatCurrency(totalPrice)}

						<span>
							{breakfastInculded &&
								`(apartment ${formatCurrency(
									apartmentPrice * numberOfNights
								)}  + breakfast ${formatCurrency(
									extrasPrice
								)} )`}
						</span>
					</DataItem>

					<p>{isPaid ? "Paid" : "Will pay at apartment"}</p>
				</Price>
			</Section>

			<Footer>
				<p>
					Booked:{" "}
					{format(new Date(created_at), "dd MMM yyyy, EEE - p")}
				</p>
			</Footer>
		</StyledBookingDataBox>
	);
}

export default BookingDataCard;
