import supabase, { supabaseUrl } from "./supabase";

export async function signup({ name, email, password }) {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: { data: { name, avatar: "" } },
	});

	if (error) throw new Error(error.message);
	// console.log(data);
	return data;
}

export async function login({ email, password }) {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);

	// console.log(data);
	return data;
}

export async function getUser() {
	const { data: session } = await supabase.auth.getSession();
	// console.log("session: ", session);

	if (!session.session) return null;

	const { data: userData, error } = await supabase.auth.getUser();

	// console.log("apiLog userData: ", userData);

	if (error) throw new Error(error.message);

	return userData?.user;
}

export async function logout() {
	const { error } = await supabase.auth.signOut();

	if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
	//1. Upd password or fullName
	let updateData;
	if (password) updateData = { password };
	if (fullName) updateData = { data: { fullName } };

	const { data, error } = await supabase.auth.updateUser(updateData);

	if (error) throw new Error(error.message);

	if (!avatar) return data;

	//2. Upload the avatar image
	const fileName = `avatar-${data.user.id}-${Math.random()}`;

	const { storageError } = await supabase.storage
		.from("avatars")
		.upload(fileName, avatar);

	if (storageError) throw new Error(storageError.message);

	//3. Upd user avatar
	const { data: updateUser, error: error2 } = supabase.auth.updateUser({
		data: {
			avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
		},
	});

	if (error2) throw new Error(error2.message);
	return updateUser;
}
