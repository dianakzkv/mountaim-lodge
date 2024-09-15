import Button from "../../components/Button";
import Modal from "../../components/Modal";
import BookingForm from "./BookingForm";

export default function AddBooking() {
	return (
		<Modal>
			<Modal.Open openName="booking-form">
				<Button>Add new booking</Button>
			</Modal.Open>
			<Modal.Window name="booking-form">
				<BookingForm />
			</Modal.Window>
		</Modal>
	);
}
