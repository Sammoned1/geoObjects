import { setMapCenterAction } from "../reducers/actions/mapActions"


export const setMapCenter = (cords:[number, number]) => {
  return setMapCenterAction(cords)
}