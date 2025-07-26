//Reference to supabase documentation

import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants";

export async function getOrders({ filter, searchBy, sortBy, page }) {
  let query = supabase.from("orders").select(
    "id, created_at, totalPrice, status, isPaid, priority, companyUID, companyName, contactInfo",

    { count: "exact" }
  );

  //FILTER
  if (filter) query = query.eq(filter.field, filter.value);
  if (searchBy)
    query = query.textSearch(searchBy.field, searchBy.value, {
      type: "websearch",
      config: "english",
    });

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
    throw new Error("Orders could not be loaded");
  }
  return { data, count };
}

export async function getOrdersById(id) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Order could not be loaded");
  }

  return data;
}

export async function getOrdersAfterDate(date) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .gte("created_at", date);

  if (error) {
    console.error(error);
    throw new Error("Order could not be loaded");
  }
  return data;
}

export async function updateOrder(id, obj) {
  console.log("data input: ", id, obj);
  const { data, error } = await supabase
    .from("orders")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Order could not be updated");
  }
  return data;
}

export async function deleteOrder(id) {
  const { error } = await supabase.from("orders").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Order could not be deleted");
  }
}
