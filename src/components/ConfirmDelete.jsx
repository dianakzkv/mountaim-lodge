import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
	width: 40rem;
	display: flex;
	flex-direction: column;
	gap: 1.2rem;

	& p {
		color: var(--color-grey-500);
		line-height: 2.6rem;
	}

	& div {
		display: flex;
		justify-content: center;
		gap: 1.2rem;
	}
`;

export default function ConfirmDelete({
	resourceName,
	onConfirm,
	disabled,
	onCloseModal,
}) {
	return (
		<StyledConfirmDelete>
			<Heading as="h3">Delete</Heading>
			<p>
				Are you sure you want to delete <b>{resourceName}</b>? Deleting
				can not be undone
			</p>

			<div>
				<Button
					variation="secondary"
					disabled={disabled}
					onClick={onCloseModal}
				>
					Cancel
				</Button>
				<Button
					variation="danger"
					disabled={disabled}
					onClick={onConfirm}
				>
					Delete
				</Button>
			</div>
		</StyledConfirmDelete>
	);
}
