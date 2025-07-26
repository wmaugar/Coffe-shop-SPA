//Reference to supabase documentation

import supabase from "./supabase";

export async function getOrderDetailsById(id) {
  const { data, error } = await supabase
    .from("orderDetails")
    .select("id, productName, quantity, unitPrice, subTotalPrice")
    .eq("orderId", id);

  if (error) {
    console.error(error);
    throw new Error("Order Details could not be loaded");
  }

  return data;
}

export async function getOrderDetails() {
  const { data, error } = await supabase.from("orderDetails").select("*");

  if (error) {
    console.error(error);
    throw new Error("Order details could not be loaded");
  }
  return data;
}

export async function getOrderDetailsAfterDate(date) {
  const { data, error } = await supabase
    .from("orderDetails")
    .select("*")
    .gte("created_at", date);

  if (error) {
    console.error(error);
    throw new Error("Order details after date could not be loaded");
  }
  return data;
}

export async function deleteOrderDetails(id) {
  const { error } = await supabase
    .from("orderDetails")
    .delete()
    .eq("orderId", id);

  if (error) {
    console.error(error);
    throw new Error("Order could not be deleted");
  }
}
