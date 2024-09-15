import styled from "styled-components";
import useQueryUser from "./useQueryUser";

const StyledUserAvatar = styled.div`
	display: flex;
	gap: 1.2rem;
	align-items: center;
	font-weight: 500;
	font-size: 1.6rem;
	color: var(--color-grey-600);
`;

const Avatar = styled.img`
	display: block;
	width: 4rem;
	width: 3.6rem;
	aspect-ratio: 1;
	object-fit: cover;
	object-position: center;
	border-radius: 50%;
	outline: 2px solid var(--color-grey-100);
`;

export default function UserAvatar() {
	const { userData: user, isLoading, error } = useQueryUser();
	const { name, avatar } = user.user_metadata;

	// console.log(user);

	if (isLoading) {
		return <StyledUserAvatar>Loading...</StyledUserAvatar>;
	}

	if (error || !user) {
		return <StyledUserAvatar>Error loading user</StyledUserAvatar>;
	}

	return (
		<StyledUserAvatar>
			<Avatar src={avatar || "default-user.jpg"} alt={`avatar`} />
			<span>{name || "User"}</span>
		</StyledUserAvatar>
	);
}
