import { formatDistance, parseISO, differenceInDays } from "date-fns";
// import { differenceInDays } from "date-fns/esm";
// import { differenceInDays } from "date-fns/esm/differenceInDays";

// this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
	differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = dateStr =>
	formatDistance(parseISO(dateStr), new Date(), {
		addSuffix: true,
	})
		.replace("about ", "")
		.replace("in", "In");

// Supabase needs an ISO date string
export const getToday = function (options = {}) {
	const today = new Date();

	if (options?.end)
		// set to the last second of the day
		today.setUTCHours(23, 59, 59, 999);
	else today.setUTCHours(0, 0, 0, 0);
	return today.toISOString();
};

export const formatCurrency = value => {
	const formattedValue = new Intl.NumberFormat("uk-UA", {
		currency: "UAH",
		minimumFractionDigits: 0,
	}).format(value);
	return `${formattedValue} ₴`;
};

export default formatCurrency;
