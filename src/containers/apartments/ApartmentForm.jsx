import { useForm } from "react-hook-form";
import Input from "../../components/Input";
import Form from "../../components/Form";
import Button from "../../components/Button";
import FileInput from "../../components/FileInput";
import Textarea from "../../components/Textarea";
import FormRow from "../../components/FormRow";
import { useCreateApartment } from "./useCreateApartment";
import { useEditApartment } from "./useEditApartment";

function ApartmentForm({ apartmentEditing = {}, onCloseModal }) {
	const { isCreating, createApartment } = useCreateApartment();
	const { isEditing, editApartment } = useEditApartment();

	const isWorking = isCreating || isEditing;

	const { id: editId, ...dataForEditing } = apartmentEditing;
	const isEdit = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEdit ? dataForEditing : {},
	});
	const { errors } = formState;
	console.log(errors);

	function onSubmit(data) {
		console.log(data);

		const photo =
			typeof data.photo === "string" ? data.photo : data.photo[0];

		if (isEdit)
			editApartment(
				{
					newApartmentData: { ...data, photo },
					id: editId,
				},
				{
					onSuccess: data => {
						console.log(data);
						reset();
						onCloseModal?.();
					},
				}
			);
		else
			createApartment(
				{ ...data, photo },
				{
					onSuccess: data => {
						console.log(data);
						reset();
						onCloseModal?.();
					},
				}
			);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			type={onCloseModal ? "modal" : "regular"}
		>
			<FormRow label="Apartment name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Capacity" error={errors?.capacity?.message}>
				<Input
					type="number"
					id="capacity"
					disabled={isWorking}
					{...register("capacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Price" error={errors?.price?.message}>
				<Input
					type="number"
					id="price"
					disabled={isWorking}
					{...register("price", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Price should be at least 100",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isWorking}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: value =>
							Number(value) <= getValues().price ||
							`Discount should be less than price`,
					})}
				/>
			</FormRow>

			<FormRow label="Description" error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					disabled={isWorking}
					defaultValue=""
					{...register("description", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Apartment photo" error={errors?.photo?.message}>
				<label htmlFor="photo">
					{isEdit && dataForEditing.photo && (
						<p>
							Selected photo:{" "}
							{dataForEditing.photo.split(
								"https://qagsgvvihmyzntlrfkwe.supabase.co/storage/v1/object/public/apartment-photos/"
							)}
						</p>
					)}
					<FileInput
						id="photo"
						accept="image/*"
						{...register("photo", {
							required: isEdit
								? false
								: "Photo should be uploaded",
						})}
					/>
				</label>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEdit ? "Edit apartment" : "Add apartment"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default ApartmentForm;
