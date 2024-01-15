import { connect } from "mongoose";
import { getDataBySlug } from "./helperFunctions";

export async function getMealBySlug(slug) {
  getDataBySlug(slug);
}
