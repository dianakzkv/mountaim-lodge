import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
	HiOutlineHome,
	HiOutlineUserGroup,
	HiOutlineCog8Tooth,
	HiOutlineCalendarDays,
} from "react-icons/hi2";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
	&:link,
	&:visited {
		display: flex;
		align-items: center;
		gap: 1.2rem;

		color: var(--color-grey-600);
		font-size: 1.6rem;
		font-weight: 500;
		padding: 1.2rem 2.4rem;
		transition: all 0.3s;
	}

	/* react-router places the active class on the active NavLink */
	&:hover,
	&:active,
	&.active:link,
	&.active:visited {
		color: var(--color-grey-800);
		background-color: var(--color-grey-50);
		border-radius: var(--border-radius-sm);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}

	&:hover svg,
	&:active svg,
	&.active:link svg,
	&.active:visited svg {
		color: var(--color-emerald-600);
	}
`;

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
function getPageTitleFromPath(path) {
	const pageName = path.slice(1); // delete first symbol "/"
	return capitalizeFirstLetter(pageName);
}

function MainNav() {
	const location = useLocation();
	useEffect(() => {
		const pageTitle = getPageTitleFromPath(location.pathname);
		document.title = pageTitle || "Mountain lodge";
	}, [location.pathname]);

	return (
		<nav>
			<NavList>
				<li>
					<StyledNavLink to="/dashboard">
						<HiOutlineHome />
						Home
					</StyledNavLink>
				</li>

				<li>
					<StyledNavLink to="/users">
						<HiOutlineUserGroup />
						Users
					</StyledNavLink>
				</li>

				<li>
					<StyledNavLink to="/apartments">
						<HiOutlineOfficeBuilding />
						Apartments
					</StyledNavLink>
				</li>

				<li>
					<StyledNavLink to="/bookings">
						<HiOutlineCalendarDays />
						Bookings
					</StyledNavLink>
				</li>

				<li>
					<StyledNavLink to="/settings">
						<HiOutlineCog8Tooth />
						Settings
					</StyledNavLink>
				</li>
			</NavList>
		</nav>
	);
}

export default MainNav;
