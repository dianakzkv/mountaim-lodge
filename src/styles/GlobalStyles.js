import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

	:root {
	--color-emerald-50: #ecfdf5;
	--color-emerald-100: #d1fae5;
	--color-emerald-200: #a7f3d0;
	--color-emerald-500: #10b981;
	--color-emerald-600: #059669;
	--color-emerald-700: #047857;
	--color-emerald-800: #065f46;
	--color-emerald-900: #064e3b;

	--color-emerald-300:#6ee7b7;
	--color-emerald-400:#34d399;
	--color-emerald-950:#022c22;

	--color-grey-0: #fff;
	--color-grey-50: #f9fafb;
	--color-grey-100: #f3f4f6;
	--color-grey-200: #e5e7eb;
	--color-grey-300: #d1d5db;
	--color-grey-400: #9ca3af;
	--color-grey-500: #6b7280;
	--color-grey-600: #4b5563;
	--color-grey-700: #374151;
	--color-grey-800: #1f2937;
	--color-grey-900: #111827;

	--color-main-100: #d1fae5;
	--color-main-700: #047857;

	--color-blue-100: #e0f2fe;
	--color-blue-700: #0369a1;
	--color-green-100: #dcfce7;
	--color-green-700: #15803d;
	--color-yellow-100: #fef9c3;
	--color-yellow-700: #a16207;
	--color-silver-100: #e5e7eb;
	--color-silver-700: #374151;

	--color-red-100: #fee2e2;
	--color-red-700: #b91c1c;
	--color-red-800: #991b1b;

	--backdrop-color: rgba(255, 255, 255, 0.1);

	--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
	--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
	--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

	--border-radius-tiny: 3px;
	--border-radius-sm: 5px;
	--border-radius-md: 7px;
	--border-radius-lg: 9px;


	}

	*,
	*::before,
	*::after {
	box-sizing: border-box;
	padding: 0;
	margin: 0;

	}

	html {
	font-size: 62.5%;
	}

	body {
	font-family: "Anek Devanagari", sans-serif;
	color: var(--color-grey-700);

	transition: color 0.3s, background-color 0.3s;
	min-height: 100vh;
	line-height: 1.5;
	font-size: 1.6rem;
	}

	input,
	button,
	textarea,
	select {
	font: inherit;
	color: inherit;
	}

	button {
	cursor: pointer;
	}

	*:disabled {
	cursor: not-allowed;
	}

	select:disabled,
	input:disabled {
	background-color: var(--color-grey-200);
	color: var(--color-grey-500);
	}

	input:focus,
	button:focus,
	textarea:focus,
	select:focus {
	outline: 1.5px solid var(--color-emerald-600);
	outline-offset: -1px;
	}

	button:has(svg) {
	line-height: 0;
	}

	a {
	color: inherit;
	text-decoration: none;
	}

	ul {
	list-style: none;
	}

	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
	overflow-wrap: break-word;
	hyphens: auto;
	}

	img {
	max-width: 100%;

	}`;

export default GlobalStyles;
