import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReser={() => window.location.replace("/")}
		>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);
