import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sorting }) {
	// const { data, error } = await supabase
	// 	.from("bookings")
	// 	.select(
	// 		"id, created_at, startDate,endDate,numberOfNights, numberOfGuests,totalPrice,status, apartments(name,price), guests(name,email)"
	// 	);

	let query = supabase
		.from("bookings")
		.select(
			"id, created_at, startDate, endDate,numberOfNights, numberOfGuests, totalPrice, status, apartments(name,price), guests(name,email)"
		);

	if (filter) query = query.eq(filter.field, filter.value);

	console.log("sorting", sorting);
	if (sorting)
		query = query.order(sorting.field, {
			ascending: sorting.direction === "ascending",
		});

	const { data, error } = await query;

	if (error) {
		console.error(error);
		throw new Error("Bookings could not be loaded");
	}

	return data;
}

export async function getBooking(bookingId) {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, apartments(*), guests(*)")
		.eq("id", bookingId)
		.single();

	console.log("getBooking bookingID", bookingId);
	console.log("getBooking data", data);

	if (error) {
		console.error(error);
		throw new Error("Booking not found");
	}

	return data;
}

export async function getBookingsAfterDate(date) {
	const { data, error } = await supabase
		.from("bookings")
		.select("created_at, totalPrice, extrasPrice")
		.gte("created_at", date)
		.lte("created_at", getToday({ end: true }));

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data;
}

export async function getStaysAfterDate(date) {
	const { data, error } = await supabase
		.from("bookings")
		// .select('*')
		.select("*, guests(name)")
		.gte("startDate", date)
		.lte("startDate", getToday());

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data;
}

export async function getStaysTodayActivity() {
	const { data, error } = await supabase
		.from("bookings")
		.select("*, guests(name, nationality)")
		.or(
			`and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
		)
		.order("created_at");

	// Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
	// (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
	// (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}
	return data;
}

export async function updateBooking(id, obj) {
	const { data, error } = await supabase
		.from("bookings")
		.update(obj)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not be updated");
	}
	return data;
}

export async function deleteBooking(id) {
	// REMEMBER RLS POLICIES
	const { data, error } = await supabase
		.from("bookings")
		.delete()
		.eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Booking could not be deleted");
	}
	return data;
}

//----------------------------------------------------

export async function createBooking(newBooking) {
	const { data, error } = await supabase
		.from("bookings")
		.insert([newBooking]);

	if (error) {
		console.error(error);
		throw new Error("Booking coudn`t be created");
	}

	return data;
}
