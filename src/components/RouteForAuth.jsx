import styled from "styled-components";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useQueryUser from "../containers/authentication/useQueryUser";

const LayoutSpinner = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

export default function RouteForAuth({ children }) {
	// 1. Load the authenticated user
	const { isLoading, isAuthenticated } = useQueryUser();
	// console.log(
	// 	"user, isLoading, isAuthenticated",
	// 	userData,
	// 	isLoading,
	// 	isAuthenticated
	// );

	const navigate = useNavigate();
	//2.If there is NO authenticated user, redirect to the /login
	useEffect(
		function () {
			if (!isAuthenticated && !isLoading) {
				navigate("/login");
			}
		},
		[isAuthenticated, isLoading, navigate]
	);

	//3. While loading, show a spinner
	if (isLoading)
		return (
			<LayoutSpinner>
				<Spinner />
			</LayoutSpinner>
		);

	//4. If there IS a user, render the app
	if (isAuthenticated) return children;
}
