import ButtonIcon from "../../components/ButtonIcon";
import { HiOutlineLogout } from "react-icons/hi";
import { useLogout } from "./useLogout";

export default function Logout() {
	const { logout, isLoading } = useLogout();
	// console.log("Logout logout, isLoading : ", logout, isLoading);

	return (
		<ButtonIcon disabled={isLoading} onClick={logout}>
			<HiOutlineLogout />
		</ButtonIcon>
	);
}
