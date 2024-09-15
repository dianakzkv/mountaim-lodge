import styled from "styled-components";
import formatCurrency from "../../utils/helpers";
import ApartmentForm from "./ApartmentForm";
import { useCreateApartment } from "./useCreateApartment";
import { useDeleteApartment } from "./useDeleteApartment";
import { HiSquare2Stack, HiPencilSquare, HiTrash } from "react-icons/hi2";
import Modal from "../../components/Modal";
import ConfirmDelete from "../../components/ConfirmDelete";
import Table from "../../components/Table";
import Button from "../../components/Button";
import { SmallButtonGroup } from "../../components/ButtonGroup";

const Img = styled.img`
	display: block;
	width: 10rem;
	aspect-ratio: 1 / 1;
	object-fit: cover;
	object-position: center;
	transform: scale(1.1);
`;
const Apartment = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Montserrat", sans-serif;
`;
const Price = styled.div`
	font-family: "Montserrat", sans-serif;
	font-weight: 600;
`;
const Discount = styled.div`
	font-family:"Montserrat", sans-serif;
	font-weight: 500;
	color: var(--color-green-700);
`;

export default function ApartmentItem({ apartment }) {
	// const [openForm, setOpenForm] = useState(false);
	const { isDeleting, deleteApartment } = useDeleteApartment();
	const { isCreating, createApartment } = useCreateApartment();

	const {
		id: apartmentId,
		name,
		capacity,
		price,
		discount,
		photo,
		description,
	} = apartment;

	function handleDuplicate() {
		createApartment({
			name: `${name}-copy`,
			capacity,
			price,
			discount,
			photo,
			description,
		});
	}

	return (
		<Table.Row>
			<Img src={photo} />

			<Apartment>{name}</Apartment>

			<div>Fits up to {capacity} guests</div>

			<Price>{formatCurrency(price)}</Price>

			{discount ? (
				<Discount>{formatCurrency(discount)} </Discount>
			) : (
				<span>&mdash;</span>
			)}

			<SmallButtonGroup>
				<Button
					size="small2"
					onClick={handleDuplicate}
					disabled={isCreating}
				>
					{/* Copy */}
					<HiSquare2Stack />
				</Button>

				<Modal>
					<Modal.Open openName="edit">
						<Button size="small2">
							{/* Edit  */}
							<HiPencilSquare />
						</Button>
					</Modal.Open>
					<Modal.Window name="edit">
						<ApartmentForm apartmentEditing={apartment} />
					</Modal.Window>

					<Modal.Open openName="delete">
						<Button size="small2">
							{/* Delete */} <HiTrash />
						</Button>
					</Modal.Open>
					<Modal.Window name="delete">
						<ConfirmDelete
							resourceName={name}
							disabled={isDeleting}
							onConfirm={() => deleteApartment(apartmentId)}
						/>
					</Modal.Window>
				</Modal>
			</SmallButtonGroup>
		</Table.Row>
	);
}
