import { createReducer } from "@reduxjs/toolkit"
import { MapState } from "../../types/mapTypes"
import { setMapCenterAction } from "./actions/mapActions"

const initialState: MapState = {
  center: [37.6173, 55.7558],
}

export const mapReducer = createReducer(initialState, builder => {
  builder
    .addCase(setMapCenterAction, (state, action) => {
      state.center = action.payload
    })
    .addDefaultCase((state) => state)
})