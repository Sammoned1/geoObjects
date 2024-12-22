import { createReducer } from "@reduxjs/toolkit";
import { PointState } from "../../types/pointTypes";
import { addPointAction, deletePointAction } from "./actions/pointActions";

const initialState: PointState = {
  points: [],
}

export const pointReducer = createReducer(initialState, builder => {
  builder
    // .addCase(fetchPointsAction, (state, action) => {
    //   state.points = action.payload
    // })
    .addCase(addPointAction, (state, action) => {
      state.points = [...state.points, action.payload]
    })
    .addCase(deletePointAction, (state, action) => {
      state.points = state.points.filter(i => i.id !== action.payload)
    })
    .addDefaultCase((state) => state)
})