//Reference to supabase documentation

import supabase, { supabaseUrl } from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getProducts({ filter1, filter2, sortBy, page }) {
  let query = supabase
    .from("products")
    .select(
      "id, created_at, productName, description, unitPrice, imageUrl, isAvailable, isFeatured, category, discount",
      { count: "exact" }
    );

  //FILTER
  if (filter1) query = query.eq(filter1.field, filter1.value);
  if (filter2) query = query.eq(filter2.field, filter2.value);

  //SORT
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("products could not be loaded");
  }
  return { data, count };
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Product could not be loaded");
  }

  return data;
}

export async function createEditProduct(newProduct, id) {
  //Check if already exists an imageUrl path
  const hasImagePath = newProduct.imageUrl?.startsWith?.(supabaseUrl);

  // Me make sure that this name is unique
  // Really important: Also replaces any dashes / with nothing
  const imageName = `${Math.random()}-${newProduct.imageUrl.name}`.replaceAll(
    "/",
    ""
  );
  console.log(imageName);
  const imagePath = hasImagePath
    ? newProduct.imageUrl
    : `${supabaseUrl}/storage/v1/object/public/coffe-shop-willy/${imageName}`;

  //https://zqtjrwtviohfttmmrukn.supabase.co/storage/v1/object/public/coffe-shop-willy/8.chocolateAndMore/Cold_Milk.jpg

  //1.Create/edit cabin
  let query = supabase.from("products");
  // Create if there is no ID (ID means editing session)
  // A) CREATE

  // Here add imageUrl as an imageUrl path
  if (!id) query = query.insert([{ ...newProduct, imageUrl: imagePath }]);

  // If there is an ID then EDIT
  // B) EDIT
  if (id)
    query = query.update({ ...newProduct, imageUrl: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Product could not be created");
  }
  // 2. Upload imageUrl
  // If it doesn't have imageUrl path then upload imageUrl
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("coffe-shop-willy")
    .upload(imageName, newProduct.imageUrl);

  //3. Delete the cabin if there was an error uploading imageUrl
  if (storageError) {
    await supabase.from("products").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Product imageUrl could not be uploaded and the product was not created"
    );
  }
  return data;
}

export async function deleteProduct(id) {
  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Product could not be deleted");
  }
}
export async function disableProduct(product) {
  const { id, isAvailable } = product;

  const { error } = await supabase
    .from("products")
    .update({ ...product, isAvailable: !isAvailable })
    .eq("id", id);

  if (error) throw new Error("Product could not be updated");
}
