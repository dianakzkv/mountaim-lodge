import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Form from "../../components/Form";
import Button from "../../components/Button";
import Textarea from "../../components/Textarea";
import FormRow from "../../components/FormRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import supabase from "../../services/supabase";
import ControlledSelect from "../../components/ControlledSelect";
// import CreateGuestForm from "../guests/CreateGuestForm";
// import Modal from "../../components/Modal";

function BookingForm({ onCloseModal }) {
	const {
		register,
		handleSubmit,
		reset,
		formState,
		watch,
		setValue,
		control,
	} = useForm();

	const queryClient = useQueryClient();

	const { mutate, isLoading: isCreating } = useMutation({
		mutationFn: createBooking,
		onSuccess: () => {
			toast.success("New booking successfully created");
			queryClient.invalidateQueries({ queryKey: ["bookings"] });
			reset();
			onCloseModal?.();
		},
		onError: err => toast.error(err.message),
	});

	const { errors } = formState;

	function onSubmit(data) {
		console.log(data);
		mutate(data);
	}

	const apartmentPrice = watch("apartmentPrice");
	const extrasPrice = watch("extrasPrice");
	const numberOfNights = watch("numberOfNights");
	const breakfastInculded = watch("breakfastInculded");

	// calculating Number of nights
	const startDate = watch("startDate");
	const endDate = watch("endDate");
	useEffect(() => {
		if (startDate && endDate) {
			const start = new Date(startDate);
			const end = new Date(endDate);
			const timeDiff = end - start;
			const daysDiff = timeDiff / (1000 * 3600 * 24);
			setValue("numberOfNights", daysDiff > 0 ? daysDiff : 0);
		}
	}, [startDate, endDate, setValue]);

	//aparments and guests
	const [guests, setGuests] = useState([]);
	const [apartments, setApartments] = useState([]);
	const [loading, setLoading] = useState(true); // Loading state

	useEffect(() => {
		// Fetch guests and apartments from Supabase
		const fetchGuestsAndApartments = async () => {
			try {
				const [guestsData, apartmentsData] = await Promise.all([
					supabase.from("guests").select("id, name"),
					supabase
						.from("apartments")
						.select("id, name, price, capacity"),
				]);
				setGuests(guestsData.data);
				setApartments(apartmentsData.data);
				setLoading(false); // Set loading to false once data is fetched
			} catch (error) {
				console.error("Error fetching guests and apartments:", error);
				setLoading(false); // Handle error by setting loading to false
			}
		};

		fetchGuestsAndApartments();
	}, [queryClient]);

	// const refreshGuests = async () => {
	// 	const { data, error } = await supabase
	// 		.from("guests")
	// 		.select("id, name");
	// 	if (error) console.error("Error fetching guests:", error);
	// 	else setGuests(data);
	// };
	// const [showNewGuestForm, setShowNewGuestForm] = useState(false);

	// Watch for changes in apartmentId and update apartmentPrice
	const apartmentId = watch("apartmentId");
	// const numberOfGuests = watch("numberOfGuests");

	useEffect(() => {
		const selectedApartment = apartments.find(
			apartment => apartment.id === parseInt(apartmentId, 10)
		);
		if (selectedApartment) {
			const finalPrice = selectedApartment.price; // - selectedApartment.discount
			setValue("apartmentPrice", finalPrice);
		}
	}, [apartmentId, apartments, setValue]);

	// Set default values for controlled selects
	useEffect(() => {
		setValue("status", "unconfirmed"); // Set default value for status
		setValue("breakfastInculded", "FALSE"); // Set default value for breakfastIncluded
		setValue("isPaid", "FALSE"); // Set default value for isPaid
	}, [setValue]);

	//========================================

	// Fetch settings from Supabase
	const [settings, setSettings] = useState({});
	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const { data: minMaxData, error: minMaxError } = await supabase
					.from("settings")
					.select("value")
					.in("key", ["minBookingLength", "maxBookingLength"]);

				const { data: breakfastData, error: breakfastError } =
					await supabase
						.from("settings")
						.select("value")
						.eq("key", "breakfastPrice")
						.single();

				if (minMaxError || breakfastError) {
					console.error(
						"Error fetching settings:",
						minMaxError || breakfastError
					);
					return;
				}

				const minMaxSettings = minMaxData.reduce((acc, setting) => {
					acc[setting.key] = parseInt(setting.value, 10);
					return acc;
				}, {});

				const breakfastPrice = parseFloat(breakfastData.value || 0);

				setSettings({
					...minMaxSettings,
					breakfastPrice,
				});
			} catch (error) {
				console.error("Error fetching settings:", error);
			}
		};

		fetchSettings();
	}, []);

	const { minBookingLength, maxBookingLength, breakfastPrice } = settings;

	// Validate numberOfNights
	useEffect(() => {
		if (
			numberOfNights < minBookingLength ||
			numberOfNights > maxBookingLength
		) {
			setValue("numberOfNights", ""); // Clear invalid value
			toast.error(
				`Number of nights must be between ${minBookingLength} and ${maxBookingLength}.`
			);
		}
	}, [numberOfNights, minBookingLength, maxBookingLength, setValue]);

	//============================

	// calculating Total price
	useEffect(() => {
		const total =
			(parseFloat(apartmentPrice || 0) * parseInt(numberOfNights, 10) ||
				0) +
			(parseFloat(extrasPrice) || 0) +
			(breakfastInculded === true ? breakfastPrice * numberOfNights : 0);
		setValue("totalPrice", total);
	}, [
		apartmentPrice,
		extrasPrice,
		numberOfNights,
		breakfastInculded,
		breakfastPrice,
		setValue,
	]);

	if (loading) {
		return <Spinner />; // Render spinner while data is loading
	}

	return (
		<>
			{/* {showNewGuestForm && (
				<Modal onClose={() => setShowNewGuestForm(false)}>
					<CreateGuestForm
						onCloseModal={() => {
							setShowNewGuestForm(false);
							refreshGuests();
						}}
					/>
				</Modal>
			)} */}

			<Form
				onSubmit={handleSubmit(onSubmit)}
				type={onCloseModal ? "modal" : "regular"}
			>
				<FormRow
					label="Date of arrival"
					error={errors?.startDate?.message}
				>
					<Input
						type="date"
						id="startDate"
						disabled={isCreating}
						{...register("startDate", {
							required: "This field is required",
						})}
					/>
				</FormRow>

				<FormRow
					label="Date of departure"
					error={errors?.endDate?.message}
				>
					<Input
						type="date"
						id="endDate"
						disabled={isCreating}
						{...register("endDate", {
							required: "This field is required",
						})}
					/>
				</FormRow>

				<FormRow
					label="Number of nights"
					error={errors?.numberOfNights?.message}
				>
					<div>{numberOfNights || 0}</div>
				</FormRow>

				<FormRow label="Guest" error={errors?.guestId?.message}>
					<ControlledSelect
						name="guestId"
						control={control}
						// disabled={isCreating}
						// options={guests.map(guest => ({
						// 	value: guest.id,
						// 	label: guest.name,
						// }))}
						// {...register("guestId", {
						// 	required: "This field is required",
						// })}
						options={[
							{ value: "", label: "Сhoose the guest" },
							...guests.map(guest => ({
								value: guest.id,
								label: guest.name,
							})),
							{ value: "createNew", label: "+ Add New Guest" },
						]}
						// {...register("guestId", {
						// 	required: "This field is required",
						// })}
						defaultValue=""
					/>
					{/* <Button
						variation="secondary"
						// onClick={() => setShowNewGuestForm(true)}
					>
						Add New Guest
					</Button> */}
				</FormRow>

				<FormRow
					label="Number of guests"
					error={errors?.numberOfGuests?.message}
				>
					<Input
						type="number"
						id="numberOfGuests"
						disabled={isCreating}
						{...register("numberOfGuests", {
							required: "This field is required",

							validate: {
								maxGuests: value => {
									const selectedApartment = apartments.find(
										apartment =>
											apartment.id ===
											parseInt(watch("apartmentId"), 10)
									);
									if (
										selectedApartment &&
										value > selectedApartment.capacity
									) {
										return `Maximum guests for this apartment is ${selectedApartment.capacity}`;
									}
									return true;
								},
							},
						})}
					/>
				</FormRow>

				<FormRow label="Apartment" error={errors?.apartmentId?.message}>
					<ControlledSelect
						name="apartmentId"
						control={control}
						options={[
							{ value: "", label: "Сhoose an apartment" },
							...apartments.map(apartment => ({
								value: apartment.id,
								label: `${apartment.name} (max ${apartment.capacity} p.)`,
							})),
						]}
						defaultValue=""
					/>
				</FormRow>

				<FormRow
					label="Apartment price"
					error={errors?.apartmentPrice?.message}
				>
					<div>{apartmentPrice || 0}</div>
				</FormRow>

				<FormRow
					label="Extras price"
					error={errors?.extrasPrice?.message}
				>
					<Input
						type="number"
						id="extrasPrice"
						disabled={isCreating}
						defaultValue={0}
						{...register("extrasPrice")}
					/>
				</FormRow>

				<FormRow
					label="Additional info"
					error={errors?.additionalInfo?.message}
				>
					<Textarea
						type="text"
						id="additionalInfo"
						disabled={isCreating}
						placeholder="Enter any additional information here..."
						defaultValue=""
					/>
				</FormRow>

				<FormRow label="Status" error={errors?.status?.message}>
					<ControlledSelect
						name="status"
						control={control}
						options={[
							{ value: "unconfirmed", label: "unconfirmed" },
							{ value: "checked-in", label: "checked-in" },
							{ value: "checked-out", label: "checked-out" },
						]}
						defaultValue="unconfirmed"
					/>
				</FormRow>

				<FormRow
					label="Breakfast included"
					error={errors?.breakfastInculded?.message}
				>
					<ControlledSelect
						name="breakfastInculded"
						control={control}
						options={[
							{ value: false, label: "FALSE" },
							{ value: true, label: "TRUE" },
						]}
						defaultValue={"FALSE"}
					/>
				</FormRow>

				<FormRow
					label={
						<span
							style={{
								fontWeight: "bold",
								fontStyle: "italic",
								textTransform: "uppercase",
							}}
						>
							Total price
						</span>
					}
					error={errors?.totalPrice?.message}
				>
					<div>
						<i>
							<b>{watch("totalPrice")}</b>
						</i>
					</div>
				</FormRow>

				<FormRow label="Is paid?" error={errors?.isPaid?.message}>
					<ControlledSelect
						name="isPaid"
						control={control}
						options={[
							{ value: "FALSE", label: "FALSE" },
							{ value: "TRUE", label: "TRUE" },
						]}
						defaultValue="FALSE"
					/>
				</FormRow>

				<FormRow>
					<Button
						variation="secondary"
						type="reset"
						onClick={() => onCloseModal?.()}
					>
						Cancel
					</Button>
					<Button disabled={isCreating}>{"Add booking"}</Button>
				</FormRow>
			</Form>
		</>
	);
}

export default BookingForm;
