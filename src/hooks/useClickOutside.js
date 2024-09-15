import { useEffect, useRef } from "react";

export default function useClickOutside(close) {
	const ref = useRef();

	useEffect(
		function () {
			function handleClick(e) {
				if (ref.current && !ref.current.contains(e.target)) {
					close();
				}
			}

			document.addEventListener("click", handleClick, true);

			return () =>
				document.removeEventListener("click", handleClick, true);
		},
		[close]
	);

	return ref;
}
