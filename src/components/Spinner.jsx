import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	margin: 4.8rem auto;
	width: 7.5rem;
	height: 7.5rem;
	border-radius: 50%;
	border: 5px solid transparent;
	border-top-color: var(--color-emerald-600);
	animation: ${rotate} 1.5s linear infinite;
`;

export default Spinner;
