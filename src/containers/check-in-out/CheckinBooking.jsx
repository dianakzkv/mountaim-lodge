import styled from "styled-components";
import Row from "../../components/Row";
import Heading from "../../components/Heading";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/Button";
import Checkbox from "../../components/Checkbox";
import Spinner from "../../components/Spinner";
import BookingDataCard from "../../containers/bookings/BookingDataCard";

import { useEffect, useState } from "react";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useSettings } from "../settings/useSettings";
import useQueryBooking from "../bookings/useQueryBooking";
import useCheckin from "./useCheckin";
import formatCurrency from "../../utils/helpers";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.2rem 3rem;
`;

function CheckinBooking() {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);

	const { booking, isLoading } = useQueryBooking();
	const { settings, isLoading: isLoadingSett } = useSettings();

	useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

	const moveBack = useMoveBack();
	const { checkin, isChecking } = useCheckin();

	if (isLoading || isLoadingSett) return <Spinner />;

	if (!booking) {
		return <div>Booking not found</div>;
	}
	if (!settings) {
		return <div>No access to setings</div>;
	}

	const {
		id: bookingId,
		guests,
		totalPrice,
		numberOfGuests,
		numberOfNights,
		breakfastInculded,
	} = booking;

	const totalBreakfastPrice =
		settings.breakfastPrice * numberOfNights * numberOfGuests;

	function handleCheckin() {
		if (!confirmPaid) return;

		if (addBreakfast) {
			checkin({
				bookingId,
				breakfast: {
					breakfastInculded: true,
					extrasPrice: totalBreakfastPrice,
					totalPrice: totalPrice + totalBreakfastPrice,
				},
			});
		} else {
			checkin({ bookingId, breakfast: {} });
		}
	}

	console.log(
		"breakfastInculded",
		breakfastInculded,
		"addBreakfast",
		addBreakfast
	);

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking № {bookingId}</Heading>
			</Row>

			<BookingDataCard booking={booking} />

			{breakfastInculded && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast(add => !add);
							setConfirmPaid(false);
						}}
						id="breakfast"
					>
						Add breakfast -
						<i>{formatCurrency(totalBreakfastPrice)}</i>
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox
					checked={confirmPaid}
					onChange={() => setConfirmPaid(confirm => !confirm)}
					disabled={confirmPaid || isChecking}
					id="confirm"
				>
					Confirmed that
					<u>
						<i>{guests.name}</i>
					</u>
					has paid the total amount of{" "}
					{!addBreakfast
						? formatCurrency(totalPrice)
						: `${formatCurrency(totalPrice + totalBreakfastPrice)}`}
					.
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>
				<Button
					onClick={handleCheckin}
					disabled={!confirmPaid || isChecking}
				>
					Check in booking № {bookingId}
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;
