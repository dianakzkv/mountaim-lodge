import Button from "../../components/Button";
import useCheckout from "./useCheckout";

export default function CheckoutButton({ bookingId }) {
	const { checkout, isLoading } = useCheckout();
	return (
		<Button
			variation="primary"
			size="small"
			onClick={() => checkout(bookingId)}
			disabled={isLoading}
		>
			Check out
		</Button>
	);
}
