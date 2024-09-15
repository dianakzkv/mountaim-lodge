import styled from "styled-components";

import BookingDataCard from "./BookingDataCard";
import Row from "../../components/Row";
import Heading from "../../components/Heading";
import Tag from "../../components/Tag";
import ButtonGroup from "../../components/ButtonGroup";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import useQueryBooking from "./useQueryBooking";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/useCheckout";
import Modal from "../../components/Modal";
import ConfirmDelete from "../../components/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingInfo() {
	const { booking, isLoading } = useQueryBooking();
	const { checkout, isCheckingOut } = useCheckout();
	const { deleteBooking, isDeleting } = useDeleteBooking();

	console.log("booking, isLoading --", booking, isLoading);

	const moveBack = useMoveBack();
	const navigate = useNavigate();

	if (isLoading || isCheckingOut) return <Spinner />;

	if (!booking) {
		return <div>Booking not found</div>;
	}

	const { status, id: bookingId } = booking;

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking № {bookingId}</Heading>
					<Tag type={statusToTagName[status]}>
						{status.replace("-", " ")}
					</Tag>
				</HeadingGroup>
			</Row>

			<BookingDataCard booking={booking} />

			<ButtonGroup>
				<Button variation="secondary" onClick={moveBack}>
					Back
				</Button>

				{status === "unconfirmed" && (
					<Button onClick={() => navigate(`/checkin/${bookingId}`)}>
						Check in
					</Button>
				)}
				{status === "checked-in" && (
					<Button onClick={() => checkout(bookingId)}>
						Check out
					</Button>
				)}
				<Modal>
					<Modal.Open openName="delete">
						<Button variation="danger">Delete</Button>
					</Modal.Open>
					<Modal.Window name="delete">
						<ConfirmDelete
							resourceName={`booking ${bookingId}`}
							disabled={isDeleting}
							onConfirm={() =>
								deleteBooking(bookingId, {
									onSettled: () => navigate(-1),
								})
							}
						/>
					</Modal.Window>
				</Modal>
			</ButtonGroup>
		</>
	);
}

export default BookingInfo;
