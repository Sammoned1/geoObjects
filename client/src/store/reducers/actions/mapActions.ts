import { createAction } from "@reduxjs/toolkit";
import { MapActionTypes } from "../../../types/mapTypes";

export const setMapCenterAction = createAction<[number, number]>(MapActionTypes.SET_CENTER)