import { createAction } from "@reduxjs/toolkit";
import { Ipoint, PointActionTypes } from "../../../types/pointTypes";


// export const fetchPointsAction = createAction<any[]>(PointActionTypes.FETCH_POINTS)
export const addPointAction = createAction<Ipoint>(PointActionTypes.ADD_POINT)
export const deletePointAction = createAction<number>(PointActionTypes.REMOVE_POINT)