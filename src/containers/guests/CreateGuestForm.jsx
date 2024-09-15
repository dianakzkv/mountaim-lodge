// import { useForm } from "react-hook-form";
// import Input from "../../components/Input";
// import Form from "../../components/Form";
// import Button from "../../components/Button";
// import FormRow from "../../components/FormRow";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import supabase from "../../services/supabase";
// import toast from "react-hot-toast";

// function CreateGuestForm({ onCloseModal }) {
// 	const {
// 		register,
// 		handleSubmit,
// 		reset,
// 		formState: { errors },
// 	} = useForm();
// 	const queryClient = useQueryClient();

// 	const { mutate, isLoading: isCreating } = useMutation({
// 		mutationFn: async newGuest => {
// 			const { data, error } = await supabase
// 				.from("guests")
// 				.insert([newGuest]);
// 			if (error) throw error;
// 			return data;
// 		},
// 		onSuccess: () => {
// 			toast.success("New guest successfully created");
// 			queryClient.invalidateQueries({ queryKey: ["guests"] });
// 			reset();
// 			onCloseModal();
// 		},
// 		onError: err => toast.error(err.message),
// 	});

// 	const onSubmit = data => {
// 		mutate(data);
// 	};

// 	return (
// 		<Form onSubmit={handleSubmit(onSubmit)} type="modal">
// 			<FormRow label="Name" error={errors?.name?.message}>
// 				<Input
// 					type="text"
// 					id="name"
// 					disabled={isCreating}
// 					{...register("name", {
// 						required: "This field is required",
// 					})}
// 				/>
// 			</FormRow>

// 			<FormRow label="Email" error={errors?.email?.message}>
// 				<Input
// 					type="email"
// 					id="email"
// 					disabled={isCreating}
// 					{...register("email", {
// 						required: "This field is required",
// 					})}
// 				/>
// 			</FormRow>

// 			<FormRow label="ID Guest" error={errors?.idGuest?.message}>
// 				<Input
// 					type="text"
// 					id="idGuest"
// 					disabled={isCreating}
// 					{...register("idGuest", {
// 						required: "This field is required",
// 					})}
// 				/>
// 			</FormRow>

// 			<FormRow label="Nationality" error={errors?.nationality?.message}>
// 				<Input
// 					type="text"
// 					id="nationality"
// 					disabled={isCreating}
// 					{...register("nationality", {
// 						required: "This field is required",
// 					})}
// 				/>
// 			</FormRow>

// 			<FormRow>
// 				<Button
// 					variation="secondary"
// 					type="reset"
// 					onClick={onCloseModal}
// 				>
// 					Cancel
// 				</Button>
// 				<Button disabled={isCreating}>Add Guest</Button>
// 			</FormRow>
// 		</Form>
// 	);
// }

// export default CreateGuestForm;
