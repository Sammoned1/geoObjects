import { Ipoint } from "../../types/pointTypes";
import { addPointAction, deletePointAction } from "../reducers/actions/pointActions";

export const addPoint = (point: Ipoint) => {
  return addPointAction(point)
}

export const removePoint = (id: number) => {
  return deletePointAction(id)
}