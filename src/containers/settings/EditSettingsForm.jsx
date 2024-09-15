import Spinner from "../../components/Spinner";
import Form from "../../components/Form";
import FormRow from "../../components/FormRow";
import Input from "../../components/Input";
import { useSettings } from "./useSettings";
import { useEditSettings } from "./useEditSettings";

function EditSettingsForm() {
	const { settings, isLoading } = useSettings();
	const { isEditing, editSetting } = useEditSettings();

	// Проверяем, загружены ли данные
	if (isLoading) return <Spinner />;

	function handleBlur(e, field) {
		const { value } = e.target;
		if (!value) return;
		editSetting({ [field]: value });
	}

	if (!settings) {
		return <div>Wait for the data to be loaded...</div>;
	}

	const {
		minBookingLength,
		maxBookingLength,
		maxGuestsPerBooking,
		breakfastPrice,
	} = settings;

	// This time we are using UNCONTROLLED fields, so we will NOT store state
	return (
		<Form>
			<FormRow label="Minimum nights per booking">
				<Input
					type="number"
					defaultValue={minBookingLength}
					onBlur={e => handleBlur(e, "minBookingLength")}
					disabled={isEditing}
					id="min-nights"
				/>
			</FormRow>
			<FormRow label="Maximum nights per booking">
				<Input
					type="number"
					defaultValue={maxBookingLength}
					onBlur={e => handleBlur(e, "maxBookingLength")}
					disabled={isEditing}
					id="max-nights"
				/>
			</FormRow>
			<FormRow label="Maximum guests per booking">
				<Input
					type="number"
					defaultValue={maxGuestsPerBooking}
					onBlur={e => handleBlur(e, "maxGuestsPerBooking")}
					disabled={isEditing}
					id="max-guests"
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					defaultValue={breakfastPrice}
					onBlur={e => handleBlur(e, "breakfastPrice")}
					disabled={isEditing}
					id="breakfast-price"
				/>
			</FormRow>
		</Form>
	);
}

export default EditSettingsForm;
