import styled from "styled-components";
import Logout from "../containers/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import UserAvatar from "../containers/authentication/UserAvatar";
import { HiOutlineUser } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const StyledHeader = styled.header`
	background-color: var(--color-grey-0);
	padding: 1.2rem 4.8rem;
	border-bottom: 1px solid var(--color-grey-100);

	display: flex;
	gap: 2rem;
	align-items: center;
	justify-content: flex-end;
`;

const StyledHeaderMenu = styled.ul`
	display: flex;
	gap: 0.2rem;
`;

function Header() {
	const navigate = useNavigate();

	return (
		<StyledHeader>
			<UserAvatar />
			<StyledHeaderMenu>
				<li>
					<ButtonIcon onClick={() => navigate("/account")}>
						<HiOutlineUser />
					</ButtonIcon>
				</li>
				<li>
					<Logout />
				</li>
			</StyledHeaderMenu>
		</StyledHeader>
	);
}

export default Header;
