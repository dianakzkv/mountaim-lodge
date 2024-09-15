import supabase, { supabaseUrl } from "./supabase";

export default async function getApartments() {
	const { data, error } = await supabase.from("apartments").select("*");

	if (error) {
		console.error(error);
		throw new Error("Apartments coudn`t be loaded");
	}

	return data;
}

export async function createEditApartment(newApartment, id) {
	// console.log(newApartment, id);

	const isPhotoPath = newApartment.photo?.startsWith?.(supabaseUrl);
	const photoName = `${Math.random()}-${newApartment.photo.name}`.replaceAll(
		"/",
		""
	);
	const photoPath = isPhotoPath
		? newApartment.photo
		: `${supabaseUrl}/storage/v1/object/public/appartment-photos/${photoName}`;
	//https://qagsgvvihmyzntlrfkwe.supabase.co/storage/v1/object/public/appartment-photos/0.1552779905836843-fireplace2.jpg
	//create or edit
	let query = supabase.from("apartments");
	//create apartment
	if (!id) {
		query = query.insert([{ ...newApartment, photo: photoPath }]);
	}
	//edit apartment
	if (id) {
		query = query
			.update({ ...newApartment, photo: photoPath })
			.eq("id", id);
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("Apartment coudn`t be created");
	}

	//upload photo
	if (isPhotoPath) return data;

	const { error: storageError } = await supabase.storage
		.from("appartment-photos")
		.upload(photoName, newApartment.photo);
	//delete the cabin if there was an error uplaoding
	if (storageError) {
		await supabase.from("apartments").delete().eq("id", data.id);

		console.error(storageError);
		throw new Error(
			"Apartment photo could not be uploaded. Apartment was not created"
		);
	}
	return data;
}

export async function deleteApartment(id) {
	const { data, error } = await supabase
		.from("apartments")
		.delete()
		.eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Apartment coudn`t be deleted");
	}
	return data;
}
