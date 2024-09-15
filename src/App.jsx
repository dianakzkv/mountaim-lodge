import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Apartments from "./pages/Apartments";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import AppLayout from "./containers/AppLayout";
import RouteForAuth from "./components/RouteForAuth";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// the data will always be up to date and a new request will be made every time we access it
			staleTime: 0,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			{/* to connect and provide a QueryClient to application */}
			<ReactQueryDevtools initialIsOpen={false} />

			<GlobalStyles />
			<BrowserRouter>
				<Routes>
					{/* routes with template for pages */}
					<Route
						element={
							<RouteForAuth>
								<AppLayout />
							</RouteForAuth>
						}
					>
						<Route
							index
							element={<Navigate replace to="dashboard" />}
						/>
						{/* redirecting the default root route to the /dashboard route */}

						{/* create route for each page */}
						<Route path="dashboard" element={<Dashboard />} />
						<Route path="account" element={<Account />} />
						<Route path="bookings" element={<Bookings />} />
						<Route
							path="bookings/:bookingId"
							element={<Booking />}
						/>
						<Route
							path="checkin/:bookingId"
							element={<Checkin />}
						/>
						<Route path="apartments" element={<Apartments />} />
						<Route path="settings" element={<Settings />} />
						<Route path="users" element={<Users />} />
					</Route>

					<Route path="login" element={<Login />} />
					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>

			{/* for notifications */}
			<Toaster
				position="top-center"
				gutter={12}
				containerStyle={{ margin: "8px" }}
				toastOptions={{
					success: { duration: 3000 },
					error: { duration: 5000 },
					style: {
						fontSize: "16px",
						maxWidth: "500px",
						padding: "12px 20px",
						backgroundColor: "var(--color-grey-0)",
						color: "var(--color-grey-700)",
					},
				}}
			/>
		</QueryClientProvider>
	);
}
export default App;
