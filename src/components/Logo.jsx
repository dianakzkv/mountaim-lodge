import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledLogo = styled.div`
	text-align: center;
`;

const Img = styled.img`
	height: 20rem;
	width: auto;
`;

function Logo() {
	return (
		<StyledLogo>
			<NavLink to="/dashboard">
				<Img src="/mountain-lodge-logo2.png" alt="Logo" />
			</NavLink>
		</StyledLogo>
	);
}

export default Logo;
