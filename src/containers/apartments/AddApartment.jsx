import Button from "../../components/Button";
import ApartmentForm from "./ApartmentForm";
import Modal from "../../components/Modal";

export default function AddApartment() {
	return (
		<Modal>
			<Modal.Open openName="apartment-form">
				<Button>Add new apartment</Button>
			</Modal.Open>
			<Modal.Window name="apartment-form">
				<ApartmentForm />
			</Modal.Window>
		</Modal>
	);
}
