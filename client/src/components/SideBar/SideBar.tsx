import React, { FC } from 'react'
import './SideBar.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { setMapCenter } from '../../store/action_creators/map'

const SideBar: FC = () => {
  const {points} = useSelector((state: RootState) => state.points)
  const dispatch = useDispatch()

  return (
    <div className='barContainer'>
      <p className='barTitle'>Список меток</p>
      <div className='barList'>
        {points.map(point => (
          <div className='barItem' onClick={() => {
            dispatch(setMapCenter([point.longitute, point.latitude]))
          }}>
            {point.name}
            <div className='barItemCords'>{point.longitute}, {point.latitude}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBar