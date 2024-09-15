import { useState } from "react";

import Button from "../../components/Button";
import FileInput from "../../components/FileInput";
import Form from "../../components/Form";
import FormRow from "../../components/FormRow";
import Input from "../../components/Input";

import useQueryUser from "./useQueryUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
	const {
		userData: {
			email,
			user_metadata: { name: currentFullName },
		},
	} = useQueryUser();

	const { updateUser, isUpdating } = useUpdateUser();

	const [fullName, setFullName] = useState(currentFullName);
	const [avatar, setAvatar] = useState(null);

	console.log(avatar);

	function handleSubmit(e) {
		e.preventDefault();
		if (!fullName) return;
		updateUser(
			{ fullName, avatar },
			{
				onSuccess: () => {
					setAvatar(null);
					e.target.reset();
				},
			}
		);
	}

	function handleCancel() {
		setFullName(currentFullName);
		setAvatar(null);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label="Email address">
				<Input value={email} disabled />
			</FormRow>
			<FormRow label="Full name">
				<Input
					type="text"
					value={fullName}
					onChange={e => setFullName(e.target.value)}
					id="fullName"
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Avatar image">
				<FileInput
					id="avatar"
					accept="image/*"
					onChange={e => setAvatar(e.target.files[0])}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow>
				<Button
					type="reset"
					variation="secondary"
					disabled={isUpdating}
					onClick={handleCancel}
				>
					Cancel
				</Button>
				<Button disabled={isUpdating}>Update account</Button>
			</FormRow>
		</Form>
	);
}

export default UpdateUserDataForm;
