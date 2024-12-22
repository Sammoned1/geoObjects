export interface Ipoint {
  id: number,
  name: string,
  type?: string,
  longitute: number,
  latitude: number
}

export interface PointState {
  points: Ipoint[],
}

export enum PointActionTypes {
  ADD_POINT = 'ADD_POINT',
  REMOVE_POINT = 'REMOVE_POINT',
  FETCH_POINTS = 'FETCH_POINTS'
}