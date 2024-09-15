import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../components/Tag";
import Table from "../../components/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { HiEye, HiTrash } from "react-icons/hi2";
import { HiCheck, HiOutlineBan } from "react-icons/hi";

import Button from "../../components/Button";
import { SmallButtonGroup } from "../../components/ButtonGroup";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../components/Modal";
import ConfirmDelete from "../../components/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Montserrat", sans-serif;
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-family: "Montserrat", sans-serif;
	font-weight: 500;
`;

export default function BookingItem({
	booking: {
		id: bookingId,
		// created_at,
		startDate,
		endDate,
		numberOfNights,
		// numOfGuests,
		totalPrice,
		status,
		guests: { name: guestName, email },
		apartments: { name },
	},
}) {
	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	const navigateTo = useNavigate();
	const { checkout, isCheckingOut } = useCheckout();
	const { deleteBooking, isDeleting } = useDeleteBooking();

	//-------------------------------
	console.log("date:", startDate);
	if (startDate && endDate) {
		formatDistanceFromNow(startDate);
		formatDistanceFromNow(endDate);
	} else {
		console.error("Invalid date:", startDate, endDate);
	}
	//-------------------------------

	return (
		<Table.Row>
			<Cabin>{name}</Cabin>

			<Stacked>
				<span>{guestName}</span>
				<span>{email}</span>
			</Stacked>

			<Stacked>
				<span>
					{isToday(new Date(startDate))
						? "Today"
						: formatDistanceFromNow(startDate)}{" "}
					({numberOfNights} night stay)
				</span>
				<span>
					{format(new Date(startDate), "dd MMM yyyy")} &mdash;{" "}
					{format(new Date(endDate), "dd MMM yyyy")}
				</span>
			</Stacked>

			<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

			<Amount>{formatCurrency(totalPrice)}</Amount>

			<SmallButtonGroup>
				<Button
					size="small2"
					onClick={() => navigateTo(`/bookings/${bookingId}`)}
				>
					<HiEye />
				</Button>
				{status === "unconfirmed" && (
					<Button
						size="small2"
						variation="secondary"
						onClick={() => navigateTo(`/checkin/${bookingId}`)}
					>
						<HiCheck />
					</Button>
				)}

				{status === "checked-in" && (
					<Button
						size="small2"
						variation="secondary"
						onClick={() => checkout(bookingId)}
						disabled={isCheckingOut}
					>
						<HiOutlineBan />
					</Button>
				)}

				<Modal>
					<Modal.Open openName="delete">
						<Button size="small2">
							<HiTrash />
						</Button>
					</Modal.Open>
					<Modal.Window name="delete">
						<ConfirmDelete
							resourceName={`booking ${bookingId}`}
							disabled={isDeleting}
							onConfirm={() => deleteBooking(bookingId)}
						/>
					</Modal.Window>
				</Modal>
			</SmallButtonGroup>
		</Table.Row>
	);
}
